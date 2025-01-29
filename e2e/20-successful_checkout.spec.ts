import { expect, test, Page, Browser } from '@playwright/test'

// This test runs before each test case
test.beforeEach(async ({ page }: { browser: Browser; page: Page }) => {
  // Navigating to the Sauce Demo website
  await page.goto('https://www.saucedemo.com/')
})

// Test case for successful checkout
test('Successful checkout', async ({ page }: { page: Page }) => {
  // Locating login elements
  const usernameField = page.locator('#user-name')
  const passwordField = page.locator('#password')
  const loginButton = page.locator('#login-button')

  // Entering username and password
  await usernameField.type('standard_user')
  await passwordField.type('secret_sauce')
  await loginButton.click()

  // Asserting title and visibility after successful login
  expect(await page.title()).toEqual('Swag Labs')
  await expect(page.locator('.primary_header')).toBeVisible()

  // Adding item to cart
  const cartItems = page.locator('.inventory_item')
  const firstCartItem = cartItems.nth(0)
  const firstCartItemButton = firstCartItem.locator('.btn_inventory')
  const firstCartItemName = await firstCartItem
    .locator('.inventory_item_name')
    .innerText()

  await firstCartItemButton.click()

  // Asserting cart badge and cart content
  expect(await page.locator('.shopping_cart_badge').innerText()).toEqual('1')
  await page.locator('.shopping_cart_link').click()
  expect(await page.locator('.cart_list .cart_item').count()).toEqual(1)
  expect(
    await page
      .locator('.cart_list .cart_item')
      .nth(0)
      .locator('.inventory_item_name')
      .innerText()
  ).toEqual(firstCartItemName)

  // Proceeding to checkout
  await page.locator('#checkout').click()
  await page.locator('#first-name').type('Yogesh')
  await page.locator('#last-name').type('Borole')
  await page.locator('#postal-code').type('0001')
  await page.locator('#continue').click()

  // Asserting checkout details
  expect(await page.locator('.inventory_item_name').innerText()).toEqual(
    firstCartItemName
  )
  expect(await page.locator('.cart_quantity').innerText()).toEqual('1')
  await page.locator('#finish').click()

  // Asserting completion message and redirect back to products
  await expect(page.locator('#checkout_complete_container')).toBeVisible()
  expect(await page.locator('.complete-header').innerText()).toEqual(
    'Thank you for your order!'
  )
  expect(await page.locator('.complete-text').innerText()).toEqual(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  )
  await expect(page.locator('img[alt="Pony Express"]')).toBeVisible()
  await page.locator('#back-to-products').click()

  // Asserting URL after returning to products page
  expect(page.url()).toContain('inventory.html')
})
