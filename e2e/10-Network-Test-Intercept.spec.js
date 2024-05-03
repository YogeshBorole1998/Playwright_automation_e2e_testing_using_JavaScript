const { test, request } = require('@playwright/test')
const { APiUtils } = require('../utils/APiUtils')
const loginPayLoad = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000'
}
const orderPayLoad = {
  orders: [{ country: 'India', productOrderedId: '6581ca399fd99c85e8ee7f45' }]
}
const fakePayLoadOrders = { data: [], message: 'No Orders' }

let response
test.beforeAll(async () => {
  const apiContext = await request.newContext()
  // Login
  const apiUtils = new APiUtils(apiContext, loginPayLoad)
  // Create Order
  response = await apiUtils.createOrder(orderPayLoad)
})

//create order is success
test('@API Place the order', async ({ page }) => {
  page.addInitScript((value) => {
    // eslint-disable-next-line no-undef
    window.localStorage.setItem('token', value)
  }, response.token)
  await page.goto('https://rahulshettyacademy.com/client')

  // Temp Solution : Login Manually //
  // await page.pause();

  // Intercepting network requests using Playwright's page.route() method
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async (route) => {
      // Fetching the original request
      const response = await page.request.fetch(route.request())
      // Creating a fake payload for orders
      const body = JSON.stringify(fakePayLoadOrders)
      // Fulfilling the intercepted request with the fake response
      route.fulfill({
        response,
        body
      })
      // Interception process: API response -> Playwright fake response -> browser -> rendering data on front end
    }
  )

  // Clicking on a button with a specific router link
  await page.locator('button[routerlink*=\'myorders\']').click()

  // Waiting for the response from the intercepted API request
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
  )

  console.log(await page.locator('.mt-4').textContent()) // You have No Orders to show at this time. Please Visit Back Us
})
