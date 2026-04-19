import { Page } from '@playwright/test'

/**
 * BasePage — shared functionality for all Page Objects.
 * Every page class extends this.
 */
export class BasePage {

  constructor(protected page: Page) {}

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle')
  }

  async getUrl(): Promise<string> {
    return this.page.url()
  }

  async getTitle(): Promise<string> {
    return this.page.title()
  }
}
