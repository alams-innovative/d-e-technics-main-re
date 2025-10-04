#!/usr/bin/env python3
"""
Simple QR decoder + products CSV updater (single step):
- Scans PNG images in scripts/qr_code_pdfs/
- Uses OpenCV's QRCodeDetector to decode
- Prints results and writes scripts/qr_codes.csv (file, qr_index, data)
- Also updates product-pdfs-with-qr.csv with a trailing column: QR Text(s)

Run (from project root):
  uv run --with opencv-python --with numpy python scripts/decode_qr.py
"""
from __future__ import annotations

from pathlib import Path
import csv
import sys
from urllib.parse import urlparse

import cv2
import numpy as np

# Paths (project-relative)
PROJECT_ROOT = Path(__file__).resolve().parents[1]
INPUT_DIR = PROJECT_ROOT / "scripts" / "qr_code_pdfs"
OUT_CSV = PROJECT_ROOT / "scripts" / "qr_codes.csv"
PRODUCTS_IN = PROJECT_ROOT / "product-pdfs.csv"
PRODUCTS_OUT = PROJECT_ROOT / "product-pdfs-with-qr.csv"

# Prepare detector
DETECTOR = cv2.QRCodeDetector()


def decode_file(p: Path):
    # Robust read on Windows paths
    data = np.fromfile(str(p), dtype=np.uint8)
    img = cv2.imdecode(data, cv2.IMREAD_COLOR)
    if img is None:
        return []

    def variants(bgr):
        out = [bgr]
        # Upscales help tiny codes
        for scale in (2.0, 3.0):
            try:
                up = cv2.resize(bgr, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
                out.append(up)
            except Exception:
                pass
        # Grayscale + adaptive threshold (normal & inverted)
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        th_norm = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                        cv2.THRESH_BINARY, 31, 5)
        th_inv = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                       cv2.THRESH_BINARY_INV, 31, 5)
        out.append(cv2.cvtColor(th_norm, cv2.COLOR_GRAY2BGR))
        out.append(cv2.cvtColor(th_inv, cv2.COLOR_GRAY2BGR))
        # Add quiet-zone borders (white & black)
        bordered = []
        for v in out:
            h, w = v.shape[:2]
            pad = max(8, int(min(h, w) * 0.04))
            wb = cv2.copyMakeBorder(v, pad, pad, pad, pad, cv2.BORDER_CONSTANT, value=(255, 255, 255))
            bb = cv2.copyMakeBorder(v, pad, pad, pad, pad, cv2.BORDER_CONSTANT, value=(0, 0, 0))
            bordered.extend((v, wb, bb))
        return bordered

    rows = []
    seen_text = set()
    # Try single-code first across variants
    for v in variants(img):
        txt, pts, _ = DETECTOR.detectAndDecode(v)
        if txt and txt not in seen_text:
            seen_text.add(txt)
            rows.append([p.name, len(rows) + 1, txt])
    # Then try multi-code across variants if nothing found
    if not rows:
        for v in variants(img):
            ok, decoded_list, points, _ = DETECTOR.detectAndDecodeMulti(v)
            if ok and decoded_list:
                for d in decoded_list:
                    if d and d not in seen_text:
                        seen_text.add(d)
                        rows.append([p.name, len(rows) + 1, d])
            if rows:
                break
    # If still nothing, ensure at least one row with empty string
    if not rows:
        rows.append([p.name, 1, ""])
    return rows


def _slug_from_filename(name: str) -> str:
    base = Path(name).stem  # e.g., de-210_p1_q1 -> de-210
    return base.split('_', 1)[0]


def _slug_from_product_page(url: str) -> str:
    try:
        parsed = urlparse(url)
        parts = [x for x in parsed.path.split('/') if x]
        return parts[-1] if parts else ''
    except Exception:
        return ''


def main() -> int:
    if not INPUT_DIR.exists():
        print(f"Input directory not found: {INPUT_DIR}", file=sys.stderr)
        return 2

    images = sorted(INPUT_DIR.glob("*.png"))
    if not images:
        print(f"No PNG images found in {INPUT_DIR}")
        return 0

    all_rows = []
    for p in images:
        res = decode_file(p)
        all_rows.extend(res)
        # Print to console
        for r in res:
            print(f"{r[0]} [q{r[1]}]: {r[2]}")

    # Write CSV
    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["file", "qr_index", "data"])
        writer.writerows(all_rows)

    print(f"\nWrote {len(all_rows)} row(s) to {OUT_CSV}")

    # Build slug -> text list mapping from decoded rows
    slug_to_texts: dict[str, list[str]] = {}
    for file_name, idx, data in all_rows:
        slug = _slug_from_filename(file_name)
        slug_to_texts.setdefault(slug, []).append(data)
    # Deduplicate while preserving order
    for k, lst in list(slug_to_texts.items()):
        seen: set[str] = set()
        slug_to_texts[k] = [t for t in lst if t and not (t in seen or seen.add(t))]

    # Update products CSV -> product-pdfs-with-qr.csv with trailing column 'QR Text(s)'
    if not PRODUCTS_IN.exists():
        print(f"Base CSV not found (skipping join): {PRODUCTS_IN}", file=sys.stderr)
        return 0

    rows_out: list[dict] = []
    with PRODUCTS_IN.open('r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        out_fields = list(fieldnames)
        # Normalize any old column name
        if 'QR URL(s)' in out_fields and 'QR Text(s)' not in out_fields:
            out_fields = [fn if fn != 'QR URL(s)' else 'QR Text(s)' for fn in out_fields]
        if 'QR Text(s)' not in out_fields:
            out_fields.append('QR Text(s)')

        for row in reader:
            slug = _slug_from_product_page(row.get('Product Page', '') or '')
            texts = slug_to_texts.get(slug, [])
            row['QR Text(s)'] = ';'.join(texts)
            rows_out.append(row)

    tmp = PRODUCTS_OUT.with_suffix(PRODUCTS_OUT.suffix + '.tmp')
    with tmp.open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=out_fields)
        writer.writeheader()
        for r in rows_out:
            if 'QR URL(s)' in r:
                r.pop('QR URL(s)', None)
            writer.writerow({k: r.get(k, '') for k in out_fields})

    tmp.replace(PRODUCTS_OUT)
    print(f"Updated products CSV -> {PRODUCTS_OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
