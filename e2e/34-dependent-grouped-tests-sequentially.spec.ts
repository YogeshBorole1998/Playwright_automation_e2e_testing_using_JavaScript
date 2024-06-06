import { Page, expect, test } from '@playwright/test'

test.describe('Run grouped tests sequentially using Playwright', () => {
  let page: Page
  test.beforeAll('01. login with valid credentials', async ({ browser }) => {
    page = await browser.newPage()

    // Test 01: Log in to the website
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill('anshika@gmail.com')
    await page.locator('#userPassword').fill('Iamking@000')
    await page.locator("[value='Login']").click()
    await page.waitForLoadState('networkidle')
  })

  test.afterAll(async () => {
    await page.close()
  })

  // Test 02: Perform actions that depend on the first test
  test('02. User should be able to add an item to the cart and verify it is in stock', async () => {
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

/* 
Playwright, by default, runs tests in parallel. When running the whole suite, the second test may start before the first 
test finishes, leading to the second test failing due to the lack of a logged-in state.

To run tests sequentially within a describe block, you can use Playwright’s ability to run tests in a serial manner. 
This ensures that each test waits for the previous one to finish before starting. However, there is no built-in support 
to run tests sequentially within a single describe block, but you can control this behavior using hooks and careful test sructuring. 
*/
