// Copy only required flag SVGs for /export from node_modules into public/flags/3x2
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = process.cwd()

// ISO 3166-1 alpha-2 codes needed on /export
const CODES = [
  'AF','GH','MY','RU','TZ','GB','BH','HT','MZ','SA','TM','US',
  'BD','ID','OM','ZA','AE','ZM','CA','KE','QA','LK','UG','IN','PK','TH'
]

async function main() {
  const srcDir = path.join(root, 'node_modules', 'country-flag-icons', 'flags', '3x2')
  const destDir = path.join(root, 'public', 'flags', '3x2')

  try {
    await fs.mkdir(destDir, { recursive: true })
  } catch (e) {
    console.error('Failed to ensure destination directory:', destDir, e)
    process.exit(1)
  }

  let copied = 0
  for (const code of CODES) {
    const src = path.join(srcDir, `${code}.svg`)
    const dest = path.join(destDir, `${code}.svg`)
    try {
      await fs.copyFile(src, dest)
      copied++
    } catch (e) {
      console.error(`Failed to copy ${code}.svg`, e?.message || e)
    }
  }

  console.log(`Copied ${copied}/${CODES.length} flags to`, destDir)
}

main().catch(err => {
  console.error('Unexpected error copying flags:', err)
  process.exit(1)
})