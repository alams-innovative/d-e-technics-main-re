import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";

export const runtime = "nodejs";

// Basic content-type map for common static assets
const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
};

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return CONTENT_TYPES[ext] || "application/octet-stream";
}

function within(base: string, target: string) {
  const rel = path.relative(base, target);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

export async function GET(req: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  try {
    const baseDir = path.join(process.cwd(), "legacy_html");

    // Build requested path within legacy_html
    const params = await ctx.params;
    const segs = params?.path ?? [];

    // No redirect for trailing slash here to avoid loops with next.config trailingSlash=false
    let reqPath = segs.join("/");

    // If no path provided, serve index.html
    if (!reqPath || reqPath.endsWith("/")) {
      reqPath = path.join(reqPath, "index.html");
    }

    // If no extension, try as ".html" first, then as path/index.html
    const hasExt = !!path.extname(reqPath);

    const candidates: string[] = [];
    if (hasExt) {
      candidates.push(reqPath);
    } else {
      candidates.push(`${reqPath}.html`);
      candidates.push(path.join(reqPath, "index.html"));
    }

    let foundPath: string | null = null;
    for (const cand of candidates) {
      const abs = path.resolve(baseDir, cand);
      if (!within(baseDir, abs)) {
        // Prevent path traversal
        continue;
      }
      try {
        const stat = await fs.stat(abs);
        if (stat.isFile()) {
          foundPath = abs;
          break;
        }
      } catch {
        // try next candidate
      }
    }

    // As a final attempt, try the raw requested path inside baseDir
    if (!foundPath) {
      const absRaw = path.resolve(baseDir, reqPath);
      if (within(baseDir, absRaw)) {
        try {
          const stat = await fs.stat(absRaw);
          if (stat.isFile()) {
            foundPath = absRaw;
          }
        } catch {}
      }
    }

    // Fallback: if requested a simple filename (e.g., "script.js") at /legacy_html,<
    // try common asset folders inside legacy_html (js/, css/, images/)
    if (!foundPath) {
      const simple = reqPath.replace(/^\/+/, "");
      if (simple && !simple.includes("/")) {
        const tryDirs = ["js", "css", "images"];
        for (const d of tryDirs) {
          const alt = path.resolve(baseDir, d, simple);
          if (within(baseDir, alt)) {
            try {
              const st = await fs.stat(alt);
              if (st.isFile()) {
                foundPath = alt;
                break;
              }
            } catch {}
          }
        }
      }
    }

    if (!foundPath) {
      return new Response("Not Found", { status: 404 });
    }

    const data = await fs.readFile(foundPath);
    const ct = getContentType(foundPath);

    // Simple response body handling: text as string, others as ArrayBuffer
    let body: BodyInit;
    const isText = ct.startsWith("text/") ||
      ct.includes("javascript") ||
      ct.includes("json") ||
      ct.includes("xml") ||
      ct.includes("svg+xml");

    if (isText) {
      let text = data.toString("utf8");
      // Minimal fix: if requesting /legacy_html without trailing slash and serving index.html,
      // inject a base tag so relative asset paths like "css/styles.css" resolve under /legacy_html/
      if (ct.startsWith("text/html")) {
        const url = new URL(req.url);
        const isRootNoSlash = segs.length === 0 && !url.pathname.endsWith("/");
        if (isRootNoSlash && !/<base\s/i.test(text)) {
          text = text.replace(/(<head[^>]*>)/i, `$1\n    <base href="/legacy_html/">`);
        }
      }
      body = text;
    } else {
      // Copy into a fresh ArrayBuffer to avoid SharedArrayBuffer typings
      const ab = new ArrayBuffer(data.byteLength);
      new Uint8Array(ab).set(data);
      body = ab;
    }

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": ct,
        // Cache static legacy files for a bit; adjust if needed
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err: any) {
    console.error("legacy_html serve error:", err?.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}
