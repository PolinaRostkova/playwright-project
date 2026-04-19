import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

/**
 * DashboardPage — the main page after login.
 *
 * HOW TO USE:
 * 1. Open your app and log in
 * 2. Inspect the dashboard elements
 * 3. Add your locators below where it says TODO
 */
export class DashboardPage extends BasePage {

  // ── Locators ─────────────────────────────────────────────────────────
  // TODO: Add your locators here
  // Examples:
  // private readonly pageTitle: Locator
  // private readonly userMenu: Locator
  // private readonly logoutButton: Locator

  constructor(page: Page) {
    super(page)
    // TODO: Initialize your locators here
    // Examples:
    // this.pageTitle    = page.getByRole('heading', { level: 1 })
    // this.userMenu     = page.getByTestId('user-menu')
    // this.logoutButton = page.getByRole('button', { name: 'Log out' })
  }

  // ── Navigation ────────────────────────────────────────────────────────
  static async goto(page: Page): Promise<DashboardPage> {
    // TODO: Update the path to your dashboard page
    await page.goto('/dashboard')
    return new DashboardPage(page)
  }

  // ── Actions ───────────────────────────────────────────────────────────
  async logout(): Promise<void> {
    // TODO: Fill in using your locators
    // await this.userMenu.click()
    // await this.logoutButton.click()
  }

  // ── State getters ─────────────────────────────────────────────────────
  async getPageTitle(): Promise<string> {
    // TODO: Return the page title text
    // return (await this.pageTitle.textContent()) ?? ''
    return ''
  }

  async isLoaded(): Promise<boolean> {
    // TODO: Return true when the page is ready
    // return this.pageTitle.isVisible()
    return false
  }
}
