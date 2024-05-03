import { type Locator, type Page, expect } from '@playwright/test'

export class HomePage {
  // Variables
  readonly page: Page
  readonly getStartedButton: Locator
  readonly pageTitle: RegExp

  // Constructor
  constructor(page: Page) {
    this.page = page
    this.getStartedButton = page.getByRole('link', { name: 'Get started' })
    this.pageTitle = /Playwright/
  }

  // Methods
  async clickGetStarted(): Promise<void> {
    await this.getStartedButton.click()
  }

  async assertPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.pageTitle)
  }
}

export default HomePage
