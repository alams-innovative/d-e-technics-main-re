import { NextResponse } from "next/server"
import { list } from "@vercel/blob"

type BlobFile = {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
  filename: string
}

type ListResult = {
  success: boolean
  files: BlobFile[]
  error?: string
}

export async function GET(req: Request) {
  try {
    // Prefer read-only token for listing; fall back to read-write if needed
    const token = process.env.BLOB_READ_ONLY_TOKEN || process.env.BLOB_READ_WRITE_TOKEN
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing BLOB_READ_ONLY_TOKEN or BLOB_READ_WRITE_TOKEN in environment" },
        { status: 500 }
      )
    }

    // Support optional query param `prefix`, but always scope under the 'pdf/' folder
    const { searchParams } = new URL(req.url)
    const rawPrefix = (searchParams.get("prefix") || "").trim()

    // Normalize to ensure we always list within 'pdf/'
    // Cases handled:
    //  - "" => "pdf/"
    //  - "some/sub/" => "pdf/some/sub/"
    //  - "pdf/some" => "pdf/some"
    let normalizedPrefix = "pdf/"
    if (rawPrefix) {
      if (rawPrefix === "pdf" || rawPrefix === "pdf/") {
        normalizedPrefix = "pdf/"
      } else if (rawPrefix.startsWith("pdf/")) {
        normalizedPrefix = rawPrefix
      } else if (rawPrefix.startsWith("/pdf/")) {
        normalizedPrefix = rawPrefix.slice(1)
      } else {
        normalizedPrefix = `pdf/${rawPrefix}`
      }
    }

    // Fetch all pages using the cursor to avoid truncation (default page size ~100)
    const allBlobs: any[] = []
    let cursor: string | undefined = undefined
    do {
      const res: { blobs: any[]; cursor?: string } = await list({ prefix: normalizedPrefix, token, cursor })
      allBlobs.push(...res.blobs)
      cursor = res.cursor
    } while (cursor)

    const files: BlobFile[] = allBlobs
      .filter((b) => /\.pdf$/i.test(b.pathname))
      .map((b) => ({
        url: b.url,
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
        filename: b.pathname.replace(/^pdf\//, ""),
      }))

    return NextResponse.json({ success: true, files })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Unexpected error" }, { status: 500 })
  }
}
