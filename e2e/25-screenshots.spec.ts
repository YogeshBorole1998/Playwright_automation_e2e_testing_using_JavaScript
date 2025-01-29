import { test } from '@playwright/test'

test.describe('Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    const userNameInput = page.locator('#user-name')
    const passwordInput = page.locator('#password')
    const loginButton = page.locator('#login-button')

    await page.goto('http://www.saucedemo.com')
    await userNameInput.fill('standard_user')
    await passwordInput.fill('secret_sauce')
    await loginButton.click()
  })

  test('Viewport screenshot', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/viewport.png' })
  })

  test('Full page screenshot', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/fullpage.png', fullPage: true })
  })

  test('Element screenshot', async ({ page }) => {
    await page
      .locator('#item_4_img_link')
      .screenshot({ path: 'screenshots/element.png' })
  })
})
