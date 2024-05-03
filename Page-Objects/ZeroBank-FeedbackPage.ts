import { Page, Locator, expect } from '@playwright/test'

export class FeedbackPage {
  readonly page: Page
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly commentInput: Locator
  readonly feedbackButton: Locator
  readonly clearButton: Locator
  readonly submitButton: Locator
  readonly feedbackSubmitMsg: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.feedbackButton = page.locator('#feedback')
    this.clearButton = page.locator("input[name='clear']")
    this.submitButton = page.locator("input[name='submit']")
    this.feedbackSubmitMsg = page.locator('.offset3.span6')
  }

  async openFeedbackForm(): Promise<void> {
    await this.feedbackButton.click()
  }

  async fillFeedbackForm(
    name: string,
    email: string,
    subject: string,
    comment: string
  ): Promise<void> {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.subjectInput.fill(subject)
    await this.commentInput.fill(comment)
  }

  async clearFeedbackForm(): Promise<void> {
    await this.clearButton.click()
  }

  async submitFeedbackForm(): Promise<void> {
    await this.submitButton.click()
  }

  async getVerifyMessage(): Promise<string> {
    const message = await this.feedbackSubmitMsg.textContent()
    return message ?? '' // Return an empty string if message is null
  }

  async assertReset(selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      const input = await this.page.locator(selector)
      await expect(input).toBeEmpty()
    }
  }

  async verifyFeedbackSentMsg(): Promise<void> {
    const verifyMsg = await this.getVerifyMessage()
    expect(verifyMsg).toContain('Thank you for your comments, some name.')
    expect(verifyMsg).toContain(
      'They will be reviewed by our Customer Service staff and given the full attention that they deserve.'
    )
  }
}
