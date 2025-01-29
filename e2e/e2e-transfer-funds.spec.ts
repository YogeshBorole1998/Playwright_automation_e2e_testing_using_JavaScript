import { test, expect } from '@playwright/test'

test.describe('Transfer funds and make payment', () => {
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

  test('transfer funds from saving to loan account', async ({ page }) => {
    await page.click('#transfer_funds_tab')
    await page.selectOption('#tf_fromAccountId', '3')
    await page.selectOption('#tf_toAccountId', '4')
    await page.fill('#tf_amount', '700')
    await page.fill('#tf_description', 'sent from saving to loan account')
    await page.click('#btn_submit')

    const boardHeader = await page.locator('h2.board-header')
    await expect(boardHeader).toContainText(
      'Transfer Money & Make Payments - Verify'
    )
    await page.click('#btn_submit')

    const submitMsg = await page.locator('.alert-success')
    await expect(submitMsg).toContainText(
      'You successfully submitted your transaction.'
    )
  })
})
