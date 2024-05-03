import { test, expect } from '@playwright/test'

test.describe('New Payment', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.getByText('Sign in').click()

    await page.goBack()
    await page.click('#onlineBankingMenu')
    await page.click('#account_summary_link')
  })

  test('should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.selectOption('#sp_payee', 'bofa')
    await page.click('.icon-question-sign')

    const bankAccount = await page.locator('#sp_payee_details')
    await expect(bankAccount).toContainText(
      'For 47844181491040 Bank of America account'
    )

    await page.selectOption('#sp_account', '4')
    await page.fill('#sp_amount', '10000')
    await page.fill('#sp_date', '2024-04-30')
    await page.fill('#sp_description', 'Payment Done')
    await page.click('#pay_saved_payees')

    const successMsg = await page.locator('#alert_content')
    await expect(successMsg).toBeVisible()
    await expect(successMsg).toContainText(
      'The payment was successfully submitted.'
    )
  })
})
