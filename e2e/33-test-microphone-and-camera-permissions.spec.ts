import { test, chromium, expect } from '@playwright/test'

test.describe('Testing Microphone and Camera Permission', () => {
  test('Verify microphone permission is granted', async () => {
    // Launch browser
    const browser = await chromium.launch()

    // Create a browser context
    const context = await browser.newContext()

    // Grant permissions for microphone
    await context.grantPermissions(['microphone'])

    // Open a new page
    const page = await context.newPage()

    // Navigate to a website that requires microphone access
    await page.goto('https://permission.site/')

    await page.click('#microphone')

    // Assert that the .success class is applied
    await expect(page.locator('.success')).toBeTruthy()

    // Assert that the button turns green
    const buttonColor = await page.evaluate(() => {
      const button = document.querySelector('#microphone')
      if (!button) return null
      const computedStyle = window.getComputedStyle(button)
      return computedStyle.backgroundColor
    })
    expect(buttonColor).toContain('rgb')

    // Close the browser
    await browser.close()
  })

  test('Verify camera permission is granted', async () => {
    // Launch browser
    const browser = await chromium.launch()

    // Create a browser context
    const context = await browser.newContext()

    // Grant permissions for camera
    await context.grantPermissions(['camera'])

    // Open a new page
    const page = await context.newPage()

    // Navigate to a website that requires camera access
    await page.goto('https://permission.site/')

    await page.click('#camera')

    // Assert that the .success class is applied
    await expect(page.locator('.success')).toBeTruthy()

    // Assert that the button turns green
    const buttonColor = await page.evaluate(() => {
      const button = document.querySelector('#camera')
      if (!button) return null
      const computedStyle = window.getComputedStyle(button)
      return computedStyle.backgroundColor
    })
    expect(buttonColor).toContain('rgb')

    // Close the browser
    await browser.close()
  })
})
