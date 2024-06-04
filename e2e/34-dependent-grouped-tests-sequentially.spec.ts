import { Page, expect, test } from '@playwright/test'

test.describe('Run grouped tests sequentially using Playwright', () => {
  let page: Page
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
  })

  test.afterAll(async () => {
    await page.close()
  })

  // Test 01: Log in to the website
  test('01. User should be able to log in with valid credentials', async () => {
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill('anshika@gmail.com')
    await page.locator('#userPassword').fill('Iamking@000')
    await page.locator("[value='Login']").click()
    await page.waitForLoadState('networkidle')
  })

  // Test 02: Perform actions that depend on the first test
  test.skip('02. User should be able to add an item to the cart and verify it is in stock', async () => {
    // Ensure Test 01 has been executed and login is successful
    await expect(page).toHaveURL(/dashboard/)

    // Perform actions after login
    await page
      .locator("//div[@class='row']//div[2]//div[1]//div[1]//button[2]")
      .click()
    await page.locator(".btn.btn-custom[routerlink='/dashboard/cart']").click()
    await expect(page.locator('.stockStatus')).toHaveText('In Stock')
  })
})
