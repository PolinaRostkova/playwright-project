import { test as setup, expect } from '@playwright/test'
import * as path from 'path'

/**
 * Auth Setup — logs in once and saves the browser session to a file.
 * All tests reuse this session instead of logging in every time.
 *
 * HOW TO ACTIVATE:
 * 1. Fill in your locators below (where it says TODO)
 * 2. In playwright.config.ts — uncomment the setup:auth project
 * 3. In playwright.config.ts — uncomment storageState in the chromium project
 */

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json')

setup('log in and save session', async ({ page }) => {

  await page.goto('/')

  // TODO: Fill in your login locators
  // await page.getByLabel('Email').fill(process.env.USER_EMAIL!)
  // await page.getByLabel('Password').fill(process.env.USER_PASSWORD!)
  // await page.getByRole('button', { name: 'Log In' }).click()

  // TODO: Update this URL to where your app goes after login
  // await page.waitForURL('**/dashboard')

  // Save the session to a file
  await page.context().storageState({ path: authFile })
})
