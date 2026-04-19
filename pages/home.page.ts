import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class HomePage extends BasePage {

  // ── Locators ─────────────────────────────────────────────────────────
  private readonly userMenu: Locator
  private readonly logOutButton: Locator
  private readonly profileButton: Locator

  constructor(page: Page, userName?: string) {
    super(page)
    this.userMenu      = userName
      ? page.getByRole('button', { name: userName })
      : page.getByRole('button', { name: /BG /i })
    this.logOutButton  = page.locator('#list-item-107 div').filter({ hasText: 'Log out' })
    this.profileButton = page.getByRole('menuitem', { name: 'Profile' })
  }

  // ── Actions ───────────────────────────────────────────────────────────
  async openUserMenu(): Promise<void> {

    await this.userMenu.click()
  }

  async logOut(): Promise<void> {
    //await this.openUserMenu()
    await this.logOutButton.click()
  }

  async goToProfile(): Promise<void> {
    //await this.openUserMenu()
    await this.profileButton.click()
  }

  // ── State getters ─────────────────────────────────────────────────────
  async isUserMenuVisible(): Promise<boolean> {
    return this.userMenu.isVisible()
  }

  async getUserMenuLabel(): Promise<string | null> {
    return this.userMenu.textContent()
  }
}
