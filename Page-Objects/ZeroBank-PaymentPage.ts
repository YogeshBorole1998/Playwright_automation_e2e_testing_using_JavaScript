import { Locator, Page, expect } from '@playwright/test'

export class PaymentPage {
  // Define selectors
  readonly page: Page
  readonly paySelectBox: Locator
  readonly questionSignIcon: Locator
  readonly payeeDetail: Locator
  readonly accountSelectBox: Locator
  readonly amountInput: Locator
  readonly dateInput: Locator
  readonly descriptionInput: Locator
  readonly submitPaymentButton: Locator
  readonly successMsg: Locator

  // Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.paySelectBox = page.locator('#sp_payee')
    this.questionSignIcon = page.locator('.icon-question-sign')
    this.payeeDetail = page.locator('#sp_payee_details')
    this.accountSelectBox = page.locator('#sp_account')
    this.amountInput = page.locator('#sp_amount')
    this.dateInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.submitPaymentButton = page.locator('#pay_saved_payees')
    this.successMsg = page.locator('#alert_content')
  }

  // Define home page methods
  async createPayment(
    payee: string,
    expectedText: string,
    accountType: string,
    amount: string,
    date: string,
    description: string
  ): Promise<void> {
    await this.paySelectBox.selectOption(payee)
    await this.questionSignIcon.click()
    await this.assertPayeeDetailText(expectedText)
    await this.accountSelectBox.selectOption(accountType)
    await this.amountInput.fill(amount)
    await this.dateInput.fill(date)
    await this.descriptionInput.fill(description)
    await this.submitPaymentButton.click()
  }

  async assertPayeeDetailText(expectedText: string): Promise<void> {
    await expect(this.payeeDetail).toContainText(expectedText)
  }

  async assertSuccessMsg(): Promise<void> {
    await expect(this.successMsg).toBeVisible()
    await expect(this.successMsg).toContainText(
      'The payment was successfully submitted.'
    )
  }
}
