// @ts-check
const { test, expect } = require('@playwright/test')

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible()
})

test('Simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com/')
  const pageTitle = page.locator('h1')

  await expect(pageTitle).toContainText('Example Domain')
})

test('Click on Elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/login.html')
  await page.getByText('Sign in').click()

  const errorMsg = page.locator('.alert-error')
  await expect(errorMsg).toContainText('Login and/or password are wrong.')
})
