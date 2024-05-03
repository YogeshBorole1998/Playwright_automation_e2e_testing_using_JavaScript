import { test, expect } from '@playwright/test'

test.describe('Filter Transactions', () => {
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

  test('verify the results for each accounts', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '3')
    const savingAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(savingAccount).toHaveCount(3)

    await page.selectOption('#aa_accountId', '4')
    const loanAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(loanAccount).toHaveCount(2)

    await page.selectOption('#aa_accountId', '5')
    const noResult = await page.locator('.well')
    await expect(noResult).toBeVisible()
  })
})
