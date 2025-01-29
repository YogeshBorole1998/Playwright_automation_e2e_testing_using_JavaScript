import { Locator, Page, expect } from '@playwright/test'

export class Navbar {
  // Define selectors
  readonly page: Page
  readonly accountSummary: Locator
  readonly accountActivity: Locator
  readonly transferFunds: Locator
  readonly PayBills: Locator
  readonly myMoneyMap: Locator
  readonly onlineStatements: Locator

  // Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.accountSummary = page.locator('#account_summary_tab')
    this.accountActivity = page.locator('#account_activity_tab')
    this.transferFunds = page.locator('#transfer_funds_tab')
    this.PayBills = page.locator('#pay_bills_tab')
    this.myMoneyMap = page.locator('#money_map_tab')
    this.onlineStatements = page.locator('#online_statements_tab')
  }

  // Define methods
  async assertAccountSummaryTabVisible(): Promise<void> {
    await expect(this.accountSummary).toBeVisible()
  }

  async clickOnTab(tab: string): Promise<void> {
    switch (tab) {
      case 'Account Summary':
        await this.accountSummary.click()
        break
      case 'Account Activity':
        await this.accountActivity.click()
        break
      case 'Transfer Funds':
        await this.transferFunds.click()
        break
      case 'Pay Bills':
        await this.PayBills.click()
        break
      case 'My Money Map':
        await this.myMoneyMap.click()
        break
      case 'Online Statements':
        await this.onlineStatements.click()
        break
      default:
        throw new Error('This tab does not exist..!!')
    }
  }
}
