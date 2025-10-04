#!/usr/bin/env python3
"""
Extract and crop QR codes from PDFs.

- Scans input folder for PDFs (default: scripts/pdfs)
- Renders pages with PyMuPDF at chosen DPI
- Detects QR codes with OpenCV's QRCodeDetector.detectAndDecodeMulti
- Crops QR regions and saves as PNG or single-page PDF
- Outputs to scripts/qr_code_pdfs by default

Usage examples (from project root):
  py -3 scripts/extract_qr_codes.py
  py -3 scripts/extract_qr_codes.py --dpi 200 --format png --margin 8
  py -3 scripts/extract_qr_codes.py --in scripts/pdfs --out scripts/qr_code_pdfs --format pdf

Requires: Python 3.10+, PyMuPDF, opencv-python, numpy
"""
from __future__ import annotations

import argparse
import sys
import os
from pathlib import Path
from typing import List, Tuple

import fitz  # PyMuPDF
import numpy as np
import cv2


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Extract and crop QR codes from PDFs")
    p.add_argument("--in", dest="input_dir", default="scripts/pdfs", help="Input directory containing PDFs")
    p.add_argument("--out", dest="output_dir", default="scripts/qr_code_pdfs", help="Output directory for cropped QR codes")
    p.add_argument("--dpi", type=int, default=220, help="Render DPI for PDF pages (higher = more detail)")
    p.add_argument("--format", choices=["png", "pdf"], default="png", help="Output format for crops")
    p.add_argument("--margin", type=int, default=6, help="Extra pixels margin around detected QR bounding box")
    p.add_argument("--max-pages", type=int, default=0, help="Limit pages per PDF (0 = all)")
    p.add_argument("--recursive", action="store_true", help="Recurse into subdirectories for PDFs")
    return p.parse_args()


def iter_pdfs(root: Path, recursive: bool) -> List[Path]:
    pattern = "**/*.pdf" if recursive else "*.pdf"
    return sorted(root.glob(pattern))


def ensure_dir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)


def page_to_image(page: fitz.Page, dpi: int) -> np.ndarray:
    # Scale factor based on DPI from 72 dpi units
    scale = dpi / 72.0
    mat = fitz.Matrix(scale, scale)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    img = np.frombuffer(pix.samples, dtype=np.uint8)
    # pix.n = number of color channels, typically 3 for RGB
    img = img.reshape((pix.height, pix.width, pix.n))
    # Convert RGB -> BGR for OpenCV
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    return img


def detect_qr(image_bgr: np.ndarray):
    """Detect QR codes and return list of (decoded_text_or_None, quad_points).

    Uses OpenCV's QRCodeDetector.detectAndDecodeMulti with a robust fallback to
    detector.detect and light preprocessing for higher recall.
    """
    detector = cv2.QRCodeDetector()

    # Primary pass: raw image
    ok, decoded_info, points, _ = detector.detectAndDecodeMulti(image_bgr)
    results = []
    if ok and points is not None:
        for text, quad in zip(decoded_info, points):
            q = np.array(quad, dtype=np.float32)
            results.append((text if text else None, q))

    # If nothing found, try a preprocessed (grayscale + adaptive threshold) image
    if not results:
        gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
        th = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY, 31, 5)
        ok2, decoded_info2, points2, _ = detector.detectAndDecodeMulti(th)
        if ok2 and points2 is not None:
            for text, quad in zip(decoded_info2, points2):
                q = np.array(quad, dtype=np.float32)
                results.append((text if text else None, q))

    # Final fallback: get points only using detector.detect
    if not results and hasattr(detector, 'detect'):
        retval, pts = detector.detect(image_bgr)
        if retval and pts is not None:
            # pts can be shape (N, 4, 2)
            for quad in np.asarray(pts):
                q = np.array(quad, dtype=np.float32)
                if q.ndim == 2 and q.shape[0] >= 4:
                    results.append((None, q[:4]))

    return results


def quad_to_bbox(quad: np.ndarray, img_shape: Tuple[int, int], margin: int) -> Tuple[int, int, int, int]:
    h, w = img_shape[:2]
    xs = quad[:, 0]
    ys = quad[:, 1]
    x1 = max(int(np.floor(xs.min())) - margin, 0)
    y1 = max(int(np.floor(ys.min())) - margin, 0)
    x2 = min(int(np.ceil(xs.max())) + margin, w)
    y2 = min(int(np.ceil(ys.max())) + margin, h)
    # Ensure at least 1px area
    if x2 <= x1:
        x2 = min(x1 + 1, w)
    if y2 <= y1:
        y2 = min(y1 + 1, h)
    return x1, y1, x2, y2


def save_crop_png(crop_bgr: np.ndarray, out_path: Path) -> None:
    # Ensure directory
    ensure_dir(out_path.parent)
    cv2.imwrite(str(out_path), crop_bgr)


def save_crop_pdf(crop_bgr: np.ndarray, out_path: Path) -> None:
    """Save the cropped image as a single-page PDF using PNG stream insertion.

    This approach is compatible with latest PyMuPDF and avoids low-level Pixmap mutation.
    """
    # Convert BGR -> RGB and encode as PNG bytes
    rgb = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2RGB)
    success, buf = cv2.imencode('.png', rgb)
    if not success:
        raise RuntimeError('Failed to encode crop as PNG for PDF embedding')
    png_bytes = buf.tobytes()

    # Open an in-memory image document from PNG bytes
    img_doc = fitz.open(stream=png_bytes, filetype="png")
    pix = img_doc[0].get_pixmap()

    # Create PDF and insert the image to a page with matching size
    pdf = fitz.open()
    page = pdf.new_page(width=pix.width, height=pix.height)
    rect = fitz.Rect(0, 0, pix.width, pix.height)
    page.insert_image(rect, stream=png_bytes)
    ensure_dir(out_path.parent)
    pdf.save(str(out_path))
    pdf.close()
    img_doc.close()


def process_pdf(pdf_path: Path, out_dir: Path, dpi: int, fmt: str, margin: int, max_pages: int) -> int:
    total_crops = 0
    print(f"Processing {pdf_path}")
    with fitz.open(pdf_path) as doc:
        for page_index in range(len(doc)):
            if max_pages and page_index >= max_pages:
                break
            page = doc[page_index]
            img = page_to_image(page, dpi)
            detections = detect_qr(img)
            if not detections:
                continue
            for idx, (decoded, quad) in enumerate(detections):
                x1, y1, x2, y2 = quad_to_bbox(quad, img.shape, margin)
                crop = img[y1:y2, x1:x2]
                base = pdf_path.stem
                if fmt == "png":
                    out_path = out_dir / f"{base}_p{page_index+1}_q{idx+1}.png"
                    save_crop_png(crop, out_path)
                else:
                    out_path = out_dir / f"{base}_p{page_index+1}_q{idx+1}.pdf"
                    save_crop_pdf(crop, out_path)
                total_crops += 1
    return total_crops


def main() -> int:
    args = parse_args()
    input_dir = Path(args.input_dir)
    output_dir = Path(args.output_dir)

    if not input_dir.exists():
        print(f"Input directory not found: {input_dir}", file=sys.stderr)
        return 2

    ensure_dir(output_dir)
    pdfs = iter_pdfs(input_dir, args.recursive)
    if not pdfs:
        print(f"No PDFs found in {input_dir}")
        return 0

    total = 0
    for pdf in pdfs:
        total += process_pdf(pdf, output_dir, args.dpi, args.format, args.margin, args.max_pages)

    print(f"\nDone. Saved {total} cropped QR code file(s) to {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
