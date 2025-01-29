import { test, expect } from '@playwright/test'

test.describe('Search Results', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })

  test('should find search results', async ({ page }) => {
    await page.fill('#searchTerm', 'Bank')
    await page.keyboard.press('Enter')

    const numberOfLinks = await page.locator('li>a')
    await expect(numberOfLinks).toHaveCount(2)
  })
})
