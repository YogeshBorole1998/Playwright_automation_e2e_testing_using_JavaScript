/* eslint-disable no-console */
/* eslint-disable playwright/no-conditional-in-test */
const { test, expect } = require('@playwright/test')

test('@Web Client App login - Verify Successful Purchase of ZARA COAT 3', async ({
  page
}) => {
  //js file- Login js, DashboardPage
  const email = 'anshika@gmail.com'
  const productName = 'IPHONE 13 PRO' // Note : If Fail Please Check Product Available
  const products = page.locator('.card-body')

  await page.goto('https://rahulshettyacademy.com/client')
  await page.locator('#userEmail').fill(email)
  await page.locator('#userPassword').fill('Iamking@000')
  await page.locator("[value='Login']").click()
  // Wait until all the api calls are made in network tab. 'networkidle' means wait until the network comes to idle state.
  await page.waitForLoadState('networkidle')
  // OR : Alternate way - simply wait for first element to be visible.
  await page.locator('.card-body b').first().waitFor()

  // allTextContents() : playwright will not wait for this method because of synchronization, it will return you empty array if you not write any one
  // line out of above 2 lines.
  const titles = await page.locator('.card-body b').allTextContents()
  console.log(titles) // ['ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO', 'Laptop', 'Laptop', 'Laptop', 'Laptop', 'Laptop', 'Laptop']

  const count = await products.count() // Get the total number of products : 9
  for (let i = 0; i < count; ++i) {
    // Loop through each product
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      // Check if the product name matches the desired product
      // If there's a match, click on the "Add To Cart" button
      await products.nth(i).locator('text= Add To Cart').click()
      // Exit the loop since the desired product is found
      break
    }
  }

  await page.locator("[routerlink*='cart']").click()
  // await page.pause();

  // Wait until the cart items are loaded and displayed - there is 4 li tag inside div but we want 1st so we use first.
  await page.locator('div li').first().waitFor()
  const bool = await page.locator(`h3:has-text("${productName}")`).isVisible()
  expect(bool).toBeTruthy()
  await page.locator('text=Checkout').click()

  /**
   * Autocomplete suggestions are not appearing when using fill(), but they do appear when using type(), it suggests that the autocomplete feature
   * relies on keyboard events to trigger the suggestions. Therefore, using type() is the appropriate choice to ensure that the autocomplete suggestions
   * are properly triggered during automation.
   */
  await page.locator("[placeholder*='Country']").type('ind')
  // Select India as a country from the Auto-suggestion Dropdown
  const dropdown = page.locator('.ta-results')
  await dropdown.waitFor() // Wait until the autocomplete results are loaded
  const optionsCount = await dropdown.locator('button').count()

  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator('button').nth(i).textContent()
    if (text === ' India') {
      await dropdown.locator('button').nth(i).click()
      break
    }
  }

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  )
  await page.locator('.action__submit').click() // click on Place Order Button
  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  )
  const orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent()
  console.log(orderId) // 661b717da86f8f74dcc0cc17

  // Click on orders on top right to go back to dashboard and check whether the new order appears or not
  await page.locator("button[routerlink*='myorders']").click()
  await page.locator('tbody').waitFor()
  const rows = page.locator('tbody tr')

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent()
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click()
      break
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent()
  expect(orderId.includes(orderIdDetails)).toBeTruthy()
})
