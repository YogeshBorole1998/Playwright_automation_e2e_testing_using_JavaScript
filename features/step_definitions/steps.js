const { When, Given, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const { POManager } = require('../../Page-Objects/POManager')
const assert = require('assert')
let poManager

// Step definition for verifying order in order history
Then('Verify order is present in the OrderHistory', async function () {
  await this.dashboardPage.navigateToOrders()
  const ordersHistoryPage = poManager.getOrdersHistoryPage()
  await ordersHistoryPage.searchOrderAndSelect(this.orderId)
  expect(
    this.orderId.includes(await ordersHistoryPage.getOrderId())
  ).toBeTruthy()
})

// Step definition for placing an order
When('Enter valid details and Place the Order', async function () {
  await this.cartPage.Checkout()

  const ordersReviewPage = poManager.getOrdersReviewPage()
  await ordersReviewPage.searchCountryAndSelect('ind', 'India')
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId()
  console.log(this.orderId)
})

// Step definition for verifying a product in the cart
Then('Verify {string} is displayed in the Cart', async function (productName) {
  this.cartPage = poManager.getCartPage()
  await this.cartPage.VerifyProductIsDisplayed(productName)
})

// Step definition for adding a product to the cart
When('Add {string} to Cart', async function (productName) {
  this.dashboardPage = poManager.getDashboardPage()
  await this.dashboardPage.searchProductAddCart(productName)
  await this.dashboardPage.navigateToCart()
})

// Step definition for logging in to the Ecommerce application
Given(
  'a login to Ecommerce application with {string} and {string}',
  { timeout: 100 * 1000 },
  async function (username, password) {
    poManager = new POManager(this.page)
    //js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(username, password)
  }
)

// Step definition for a table step
Given(/^a table step$/, function (table) {
  const expected = [
    ['Apricot', '5'],
    ['Brocolli', '2'],
    ['Cucumber', '10']
  ]
  assert.deepEqual(table.rows(), expected)
})

// Step definition for logging in to the Ecommerce2 application
Given(
  'a login to Ecommerce2 application with {string} and {string}',
  { timeout: 100 * 1000 },
  async function (username, password) {
    const userName = this.page.locator('#username')
    const signIn = this.page.locator('#signInBtn')
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await this.page.title())
    await userName.type('rahulshetty')
    await this.page.locator('[type=\'password\']').type('learning')
    await signIn.click()
  }
)

// Step definition for verifying error message display
Then('Verify Error message is displayed', async function () {
  await expect(this.page.locator('[style*=\'block\']')).toContainText('Incorrect')
})

Given('I visit a login page', async function () {
  await this.page.goto('https://www.saucedemo.com/')
})

When('I fill the login form with valid credentials', async function () {
  await this.page.fill('#user-name', 'standard_user')
  await this.page.fill('#password', 'secret_sauce')
  await this.page.click('#login-button')
})

Then('I should see the home page', async function () {
  const appLogo = this.page.locator('.app_logo')
  await expect(appLogo).toBeVisible()
  await expect(appLogo).toContainText('Swag Labs')
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

When(
  'I fill the login form with {string} and {string}',
  async function (username, password) {
    await this.page.fill('#user-name', username)
    await this.page.fill('#password', password)
    await this.page.click('#login-button')
  }
)

Then('I wait for 2 seconds', async function () {
  await this.page.waitForTimeout(2000)
})
//npx cucumber-js features/ErrorValidation.feature --exit
//npx cucumber-js --parallel 2 --exit --format html:cucumber-report.html
//npx cucumber-js features/greeting.feature --parallel 2 --exit --format html:cucumber-report.html
//npx cucumber-js features/login.feature -f json:cucumber_report.json --exit
//./node_modules/.bin/cucumber-js --require cucumber.js --require step-definitions/**/*.js -f json:cucumber_report.json --publish-quiet
