import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from './ZeroBank-AbstractPage'

export class LoginPage extends AbstractPage {
  // Define selectors
  // readonly page: Page;
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  // Initialize selectors using constructor
  constructor(page: Page) {
    // this.page = page;
    super(page)
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.loginButton = page.getByText('Sign in')
    this.errorMessage = page.locator('.alert-error')
  }

  // Define login page methods
  /**
   * Navigate to the login page
   */
  async visit(): Promise<void> {
    await this.page.goto('http://zero.webappsecurity.com/')
  }

  /**
   * Perform login operation
   * @param username - The username to fill in the username input field
   * @param password - The password to fill in the password input field
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  /**
   * Assert error message displayed on the login page
   */
  async assertErrorMsg(): Promise<void> {
    await expect(this.errorMessage).toContainText(
      'Login and/or password are wrong.'
    )
  }
}
