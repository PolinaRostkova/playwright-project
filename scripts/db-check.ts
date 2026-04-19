import * as dotenv from 'dotenv'
import * as path from 'path'
import { DbClient } from '../helpers/db.client'

const envPath = path.resolve(process.cwd(), 'config/.env.local')
console.log('Loading env from:', envPath)
const result = dotenv.config({ path: envPath, override: true })
console.log('Dotenv parsed:', result.parsed)
if (result.error) console.log('Dotenv error:', result.error)

async function main() {
  const db = new DbClient({
    host:     process.env.DB_HOST!,
    port:     Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME!,
    user:     process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  })

  console.log('DB config:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
  })
  console.log('Connecting to DB...')
  await db.connect()
  console.log('Connected!')

  const rows = await db.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
    LIMIT 20
  `)
  console.table(rows)

  await db.disconnect()
}

main().catch(err => {
  console.error('DB connection failed:', err)
  process.exit(1)
})
