import { test, expect } from '@playwright/test'

test.describe('Currency Exchange Form', () => {
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

  test('should make currency exchange', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click("a[href='#ui-tabs-3']")
    await page.selectOption('#pc_currency', 'CHF') // select Switzerland (franc)

    const todaysSellRate = await page.locator('#sp_sell_rate')
    await expect(todaysSellRate).toContainText(
      '1 franc (CHF) = 1.1383 U.S. dollar (USD)'
    )
    await page.fill('#pc_amount', '5000')
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')

    const convertedAmount = await page.locator('#pc_conversion_amount')
    await expect(convertedAmount).toContainText(
      '4392.52 franc (CHF) = 5000.00 U.S. dollar (USD)'
    )

    await page.click('#purchase_cash')

    const successMessage = await page.locator('#alert_content')
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toContainText(
      'Foreign currency cash was successfully purchased.'
    )
  })
})
