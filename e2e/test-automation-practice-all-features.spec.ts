import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://moatazeldebsy.github.io/test-automation-practices/')
})

test.describe('Test Automation Practice - Basic', () => {
  test('Test About Section', async ({ page }) => {
    await page.locator('[data-test="nav-about"]').click()

    await expect(
      page.getByRole('heading', { name: 'About Test Automation Practice' })
    ).toBeVisible()

    await expect(page.locator('h1')).toContainText(
      'About Test Automation Practice'
    )
  })
})
