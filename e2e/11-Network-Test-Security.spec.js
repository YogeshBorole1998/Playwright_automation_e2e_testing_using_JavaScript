const { test, expect } = require('@playwright/test')

test('@API Security test request intercept', async ({ page }) => {
  //login and reach orders page
  await page.goto('https://rahulshettyacademy.com/client')
  await page.locator('#userEmail').fill('anshika@gmail.com')
  await page.locator('#userPassword').type('Iamking@000')
  await page.locator("[value='Login']").click()
  await page.waitForLoadState('networkidle')
  await page.locator('.card-body b').first().waitFor()

  await page.locator("button[routerlink*='myorders']").click()
  // Intercepting network requests using Playwright's page.route() method
  await page.route(
    // Intercepting requests to get order details API endpoint
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    // Callback function to handle intercepted requests
    (route) =>
      // Continuing the intercepted request with a modified URL
      route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
      })
  )

  // Clicking on the first button element that contains the text 'View'
  await page.locator("button:has-text('View')").first().click()

  // Waiting for the last 'p' element and expecting it to have specific text
  await expect(page.locator('p').last()).toHaveText(
    'You are not authorize to view this order'
  )
})
