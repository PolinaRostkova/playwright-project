import { test, expect } from '@playwright/test'
import { DbClient } from '../../../helpers/db.client'

let db: DbClient

test.beforeAll(async () => {
  db = new DbClient({
    host:     process.env.DB_HOST!,
    port:     Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME!,
    user:     process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  })
  await db.connect()
})

test.afterAll(async () => {
  await db.disconnect()
})

const tables = ['company', 'departments', 'sales', 'salesperson', 'scrumteam']

for (const table of tables) {
  test(`query ${table}`, async () => {
    const rows = await db.query(`SELECT * FROM ${table}`)
    console.log(`\n=== ${table} (${rows.length} rows) ===`)
    console.table(rows)
    expect(rows.length).toBeGreaterThanOrEqual(0)
  })
}
