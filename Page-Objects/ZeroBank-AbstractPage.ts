import { Page } from '@playwright/test'

export class AbstractPage {
  // Define selectors
  readonly page: Page

  // Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page
  }

  // Define home page methods
  async wait(time: number): Promise<void> {
    await this.page.waitForTimeout(time)
  }
}
