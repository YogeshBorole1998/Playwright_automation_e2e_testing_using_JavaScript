import { test, expect } from '@playwright/test'

test.describe('Visual testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://www.saucedemo.com')
  })

  test('Visual test - login page', async ({ page }) => {
    await expect(page).toHaveScreenshot({ maxDiffPixels: 10000 })
  })
})
