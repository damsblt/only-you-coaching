#!/usr/bin/env node

/**
 * Import videos from the curated CSV into Supabase (Postgres) via Prisma.
 * - Reads desired_output.csv (semicolon-delimited)
 * - Maps fields to Prisma Video model
 * - Upserts by ID
 */

const path = require('path')
const fs = require('fs')
const readline = require('readline')
let parseCsvSync

// Load env (optional); we will also set DATABASE_URL explicitly like other scripts
try {
  const dotenv = require('dotenv')
  const envLocalPath = path.join(__dirname, '..', '.env.local')
  const envPath = path.join(__dirname, '..', '.env')
  const loaded = dotenv.config({ path: envLocalPath })
  if (loaded.error) {
    dotenv.config({ path: envPath })
  }
} catch (_) {}

// Use the same DATABASE_URL approach as migrate-metadata-only.js
process.env.DATABASE_URL = process.env.DATABASE_URL ||
  'postgresql://postgres:tIwji3-gergiv-mihsew@db.otqyrsmxdtcvhueriwzp.supabase.co:5432/postgres'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const CSV_PATH = path.resolve(
  __dirname,
  '..',
  '..',
  'Dossier Cliente',
  'Wix CMS',
  'desired_output.csv'
)

function parseCSVLine(line, delimiter = ';') {
  // Simple CSV parser for semicolon CSV without embedded quotes across delimiters
  // Handles "" quotes around values
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      // toggle or escaped quote
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === delimiter && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

function csvToObjects(filePath, delimiter = ';') {
  // Prefer robust parser if available to handle embedded newlines
  try {
    if (!parseCsvSync) {
      parseCsvSync = require('csv-parse/sync').parse
    }
    const content = fs.readFileSync(filePath, 'utf-8')
    const records = parseCsvSync(content, {
      columns: true,
      skip_empty_lines: true,
      delimiter,
    })
    const headers = Object.keys(records[0] || {})
    return Promise.resolve({ headers, rows: records })
  } catch (err) {
    // Fallback to simple line parser (no multiline support)
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath, { encoding: 'utf-8' })
      const rl = readline.createInterface({ input: stream, crlfDelay: Infinity })
      let headers = null
      const rows = []
      rl.on('line', (line) => {
        if (!headers) {
          headers = parseCSVLine(line, delimiter)
        } else {
          const values = parseCSVLine(line, delimiter)
          const obj = {}
          headers.forEach((h, idx) => (obj[h] = values[idx] ?? ''))
          rows.push(obj)
        }
      })
      rl.on('close', () => resolve({ headers, rows }))
      rl.on('error', reject)
    })
  }
}

function mapDifficulty(value) {
  const v = (value || '').toLowerCase()
  if (v.includes('avanc')) return 'ADVANCED'
  if (v.includes('interm')) return 'INTERMEDIATE'
  // "Tout niveau" => BEGINNER by default
  return 'BEGINNER'
}

function toArray(value) {
  if (!value) return []
  return [String(value)]
}

async function upsertFromCSV() {
  console.log('📥 Importing videos from CSV → Supabase')
  console.log('CSV:', CSV_PATH)

  if (!fs.existsSync(CSV_PATH)) {
    throw new Error('CSV file not found: ' + CSV_PATH)
  }

  const { headers, rows } = await csvToObjects(CSV_PATH, ';')
  console.log(`🧾 Rows: ${rows.length}`)

  let ok = 0
  let fail = 0

  for (const row of rows) {
    const id = (row['ID'] || '').trim()
    const title = (row['Title'] || '').trim()
    const videoUrl = (row['S3 Video URL'] || '').trim()
    const thumbnail = (row['Image de couverture'] || '').trim()

    // Strategy: if ID present, upsert by ID; otherwise try update by Title
    if (!title || !videoUrl) {
      console.log(`⏭️  Skipping (missing title/videoUrl): ${title || '(no title)'} [${id}]`)
      continue
    }

    try {
      if (id) {
        await prisma.video.upsert({
          where: { id },
          update: { title, videoUrl, thumbnail: thumbnail || null },
          create: {
            id,
            title,
            description: null,
            detailedDescription: null,
            thumbnail: thumbnail || null,
            videoUrl,
            duration: 0,
            difficulty: mapDifficulty(row['Intensité']),
            category: row['Thème'] || 'video',
            region: null,
            muscleGroups: toArray(row['Référence groupe musculaire']),
            startingPosition: row['Position de depart'] || null,
            movement: row['Mouvement'] || null,
            intensity: row['Intensité'] || null,
            theme: row['Thème'] || null,
            series: row['serie'] || null,
            constraints: row['Contre-indication'] || null,
            tags: [],
            folder: null,
            isPublished: true,
          },
        })
        ok++
      } else {
        const res = await prisma.video.updateMany({
          where: { title },
          data: { videoUrl, thumbnail: thumbnail || null },
        })
        if (res.count === 0) {
          console.log(`⚠️  No match by title, skipping: ${title}`)
          continue
        }
        ok += res.count
      }
      if (ok % 50 === 0) console.log(`✅ Updated ${ok} so far...`)
    } catch (err) {
      fail++
      console.error(`❌ Failed: ${title} (${id}) → ${err.message}`)
    }
  }

  console.log(`\n✅ Upserted: ${ok} | ❌ Failed: ${fail}`)
}

async function main() {
  try {
    await upsertFromCSV()
  } catch (e) {
    console.error('💥 Import failed:', e.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { upsertFromCSV }


