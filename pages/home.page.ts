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

  // ── Navigation ────────────────────────────────────────────────────────
  async navigateTo(linkName: string): Promise<void> {
    const navLinks = this.page.getByRole('listbox').getByRole('link')
    const count = await navLinks.count()

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i)
      const text = await link.textContent()

      if (text?.trim().toLowerCase() === linkName.toLowerCase()) {
        await link.click()
        return
      }
    }

    throw new Error(`Nav link "${linkName}" not found`)
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
