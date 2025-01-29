const { test, expect, request } = require('@playwright/test')
const { APiUtils } = require('../utils/APiUtils')

// Define the login payload with user credentials
const loginPayLoad = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000'
}

// Define the order payload with the country and product ID
const orderPayLoad = {
  orders: [{ country: 'India', productOrderedId: '6581ca399fd99c85e8ee7f45' }]
}

let response

// Run before all tests to authenticate and create an order
test.beforeAll(async () => {
  // Create a new context for API requests
  const apiContext = await request.newContext()
  // Initialize API utilities with the context and login payload
  const apiUtils = new APiUtils(apiContext, loginPayLoad)
  // Send API request to create an order and store the response
  response = await apiUtils.createOrder(orderPayLoad)
  console.log(response)
})

// Test case to verify successful order placement via API
test('@API Place the order', async ({ page }) => {
  // Add the authentication token to local storage before navigating
  page.addInitScript((value) => {
    // eslint-disable-next-line no-undef
    window.localStorage.setItem('token', value)
  }, response.token)

  // Navigate to the client page
  await page.goto('https://rahulshettyacademy.com/client')

  // Wait for navigation and pause for inspection - // Temp Solution : Login Manually //
  // await page.pause();

  // Click on the "My Orders" button
  await page.locator('button[routerlink*=\'myorders\']').click()

  // Wait for the table body to load
  await page.locator('tbody').waitFor()

  // Retrieve all rows in the orders table
  const rows = page.locator('tbody tr')

  // Iterate through each row to find the order ID
  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent()
    // If the order ID matches the created order, click on it
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click()
      break
    }
  }

  // Get the order details displayed on the page
  const orderIdDetails = await page.locator('.col-text').textContent()

  // Verify if the created order ID is displayed in the details
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy()
})

//Verify if order created is showing in history page
// Precondition - create order -
