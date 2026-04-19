import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class LoginPage extends BasePage {

  // ── Locators ─────────────────────────────────────────────────────────
  private readonly usernameInput: Locator
  private readonly passwordInput: Locator
  private readonly loginButton: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.getByRole('textbox', { name: 'Username or email' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.loginButton   = page.getByRole('button', { name: 'Log in' })
  }

  // ── Navigation ────────────────────────────────────────────────────────
  static async goto(page: Page): Promise<LoginPage> {
    await page.goto('/')
    return new LoginPage(page)
  }

  // ── Actions ───────────────────────────────────────────────────────────
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
