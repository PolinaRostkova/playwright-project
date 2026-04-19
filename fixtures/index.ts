import { test as base, expect } from '@playwright/test'
import { LoginPage }     from '../pages/login.page'
import { DashboardPage } from '../pages/dashboard.page'
// Import DbClient when database is ready:
// import { DbClient } from '../helpers/db.client'

// ── Define types for all custom fixtures ──────────────────────────────────
type AppFixtures = {
  loginPage:     LoginPage
  dashboardPage: DashboardPage
  // Add DB fixture when ready:
  // dbClient: DbClient
}

// ── Create the custom test object ─────────────────────────────────────────
export const test = base.extend<AppFixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = await LoginPage.goto(page)
    await use(loginPage)
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page)
    await use(dashboardPage)
  },

  // ── DB CLIENT ─────────────────────────────────────────────────────────
  // Uncomment when you have database access:
  //
  // dbClient: [async ({}, use) => {
  //   const db = new DbClient({
  //     host:     process.env.DB_HOST!,
  //     port:     Number(process.env.DB_PORT) || 5432,
  //     database: process.env.DB_NAME!,
  //     user:     process.env.DB_USER!,
  //     password: process.env.DB_PASSWORD!,
  //   })
  //   await db.connect()
  //   await use(db)
  //   await db.disconnect()
  // }, { scope: 'worker' }],

})

// Always import test and expect from this file — not from @playwright/test
export { expect }
