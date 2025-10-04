// Node.js script to download all brochure PDFs listed in product-pdfs.csv
// Location: scripts/download_pdfs.mjs
// Output folder: scripts/pdfs/

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0)
  if (lines.length === 0) return []

  // Skip header
  const dataLines = lines.slice(1)
  const rows = []
  const re = /^\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*$/
  for (const line of dataLines) {
    const m = line.match(re)
    if (!m) {
      // Try to recover if there are stray spaces; attempt a more lenient match
      const relaxed = line
        .trim()
        .replace(/\s+,\s+/g, ',')
      const m2 = relaxed.match(/^"([^"]*)","([^"]*)","([^"]*)"$/)
      if (m2) {
        rows.push({ name: m2[1], page: m2[2], brochure: m2[3] })
      } else {
        console.warn('Skipping unparsable line:', line)
      }
    } else {
      rows.push({ name: m[1], page: m[2], brochure: m[3] })
    }
  }
  return rows
}

function getSlugFromUrl(urlStr) {
  try {
    const u = new URL(urlStr)
    const parts = u.pathname.split('/').filter(Boolean)
    return parts[parts.length - 1] || 'brochure'
  } catch {
    return 'brochure'
  }
}

async function download(url, destFile) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  const arrayBuf = await res.arrayBuffer()
  await fs.writeFile(destFile, Buffer.from(arrayBuf))
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..')
  const csvPath = path.join(projectRoot, 'product-pdfs.csv')
  const outDir = path.join(__dirname, 'pdfs')

  await ensureDir(outDir)

  const csvText = await fs.readFile(csvPath, 'utf8')
  const rows = parseCsv(csvText)
  if (rows.length === 0) {
    console.error('No rows found in CSV:', csvPath)
    process.exit(1)
  }

  console.log(`Found ${rows.length} entries. Downloading PDFs to: ${outDir}`)

  // Simple concurrency limiter
  const concurrency = 4
  let index = 0
  const errors = []

  async function worker(id) {
    while (true) {
      const i = index++
      if (i >= rows.length) break
      const row = rows[i]
      const slug = getSlugFromUrl(row.page)
      const filename = `${slug}.pdf`
      const dest = path.join(outDir, filename)
      try {
        if (!row.brochure || row.brochure === '#') {
          console.warn(`[${i + 1}/${rows.length}] Skipping (no brochure): ${row.name}`)
          continue
        }
        console.log(`[${i + 1}/${rows.length}] Downloading: ${row.name} -> ${filename}`)
        await download(row.brochure, dest)
      } catch (err) {
        console.error(`[${i + 1}/${rows.length}] Failed: ${row.name} (${row.brochure}) ->`, err.message)
        errors.push({ row, error: String(err) })
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i))
  await Promise.all(workers)

  if (errors.length) {
    console.log(`\nCompleted with ${errors.length} errors.`)
  } else {
    console.log('\nAll downloads completed successfully.')
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
