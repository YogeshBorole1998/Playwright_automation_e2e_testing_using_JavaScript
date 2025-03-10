//Login UI  -> .json

//test browser-> .json , cart-,order, orderdetails,orderhistory
const { test, expect } = require('@playwright/test')
let webContext

// Initialize a new browser context and page before running tests
test.beforeAll(async ({ browser }) => {
  // Create a new context and page for web interactions
  const context = await browser.newContext()
  const page = await context.newPage()

  // Navigate to the client page and login
  await page.goto('https://rahulshettyacademy.com/client')
  await page.locator('#userEmail').fill('rahulshetty@gmail.com')
  await page.locator('#userPassword').type('Iamking@000')
  await page.locator("[value='Login']").click()

  // Wait for the page to finish loading
  await page.waitForLoadState('networkidle')

  // Save the browser storage state to a file
  await context.storageState({ path: 'state.json' })

  // Create a new browser context with the saved storage state for API tests
  webContext = await browser.newContext({ storageState: 'state.json' })
})

// Test case for API interactions
test('@API Test case 2', async () => {
  // Create a new page in the API test context
  const page = await webContext.newPage()

  // Navigate to the client page in the API test context
  await page.goto('https://rahulshettyacademy.com/client')

  // Wait for the page to finish loading
  await page.waitForLoadState('networkidle')

  // Retrieve and log the titles of card body elements
  const titles = await page.locator('.card-body b').allTextContents()
  console.log(titles)
})

test.fixme('@QA Client App login', async () => {
  //fail
  const email = 'rahulshetty@gmail.com'
  const productName = 'Banarsi Saree'
  const page = await webContext.newPage()
  await page.goto('https://rahulshettyacademy.com/client')
  const products = page.locator('.card-body')
  const titles = await page.locator('.card-body b').allTextContents()
  console.log(titles)
  const count = await products.count()
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      //add to cart
      await products.nth(i).locator('text= Add To Cart').click()
      break
    }
  }
  await page.locator("[routerlink*='cart']").click()
  await page.locator('div li').first().waitFor()
  const bool = await page.locator("h3:has-text('banarsi saree')").isVisible()
  expect(bool).toBeTruthy()
  await page.locator('text=Checkout').click()
  await page.locator("[placeholder*='Country']").type('ind', { delay: 100 })
  const dropdown = page.locator('.ta-results')
  await dropdown.waitFor()
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
  await page.locator('.action__submit').click()

  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  )
  const orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent()
  console.log(orderId)
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
