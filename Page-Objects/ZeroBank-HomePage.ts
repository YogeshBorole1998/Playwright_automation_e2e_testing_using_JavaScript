import { Locator, Page, expect } from '@playwright/test'

export class HomePage {
  // Define selectors
  readonly page: Page
  readonly signInBtn: Locator
  readonly searchBox: Locator
  readonly links: Locator
  readonly onlineBankingMenu: Locator
  readonly accountSummaryLink: Locator

  // Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.signInBtn = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.links = page.locator('li>a')
    this.onlineBankingMenu = page.locator('#onlineBankingMenu')
    this.accountSummaryLink = page.locator('#account_summary_link')
  }

  // Define home page methods
  async clickOnSigninButton(): Promise<void> {
    await this.signInBtn.click()
  }

  async searchFor(searchTerm: string): Promise<void> {
    await this.searchBox.fill(searchTerm)
    await this.page.keyboard.press('Enter')
  }

  async assertNumberOfLinks(expectedCount: number): Promise<void> {
    await expect(this.links).toHaveCount(expectedCount)
  }

  async navigateToAccountSummary(): Promise<void> {
    await this.onlineBankingMenu.click()
    await this.accountSummaryLink.click()
  }
}
