import { test, expect } from '@playwright/test'

test.describe('Login/Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })

  test('Negative Scenario for login', async ({ page }) => {
    await page.click('#signin_button')
    await expect(page).toHaveTitle('Zero - Log in')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/login.html')
    await expect(page).toHaveURL(/.*webappsecurity/)
    await page.fill('#user_login', 'invalid-user')
    await page.fill('#user_password', 'invalid-pass')
    await page.getByText('Sign in').click()

    const errorMsg = await page.locator('.alert-error')
    await expect(errorMsg).toContainText('Login and/or password are wrong.')
  })

  test('Positive Scenario for login & logout', async ({ page }) => {
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.getByText('Sign in').click()

    await page.goBack()
    await page.click('#onlineBankingMenu')
    await page.click('#account_summary_link')
    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()
  })
})
