import { test, expect } from '@playwright/test'

test('Element state', async ({ page }) => {
  await page.goto('http://www.saucedemo.com')
  console.log(await page.locator('#user-name').isEditable()) // true
  console.log(await page.locator('#password').isVisible()) // true
  console.log(await page.locator('#login-button').isHidden()) // false
})
