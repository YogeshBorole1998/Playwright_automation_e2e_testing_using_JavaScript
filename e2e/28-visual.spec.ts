import { test, expect } from '@playwright/test'

test.describe('Visual testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://www.saucedemo.com')
  })

  test('Visual test - login page', async ({ page }) => {
    await expect(page).toHaveScreenshot({ maxDiffPixels: 10000 })
  })

  test('Visual comparison testing in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://github.com/login')

    // before actions 2 images comparison
    await expect(page).toHaveScreenshot('githubpage.png', { maxDiffPixels: 1000 })

    await page.locator('#login_field').click()
    await page.locator('#login_field').fill('testers talk')

    // after actions 2 images comparisons
    await expect(page).toHaveScreenshot('githubpage-chromium-win32.png', { maxDiffPixels: 1000 })
    await page.waitForTimeout(3000)
  })

  test('Element Comparison in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://github.com/login')

    const element = page.locator('#login_field')
    await expect(element).toHaveScreenshot('element.png')

    await page.waitForTimeout(3000)
  })
})
