import { test, expect } from '@playwright/test'

test.describe('Mouse', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jspaint.app/')
  })

  test('Mouse paint', async ({ page }) => {
    await page.mouse.move(200, 200)
    await page.mouse.down()
    await page.mouse.move(400, 200)
    await page.mouse.move(400, 400)
    await page.mouse.move(200, 400)
    await page.mouse.move(200, 200)
    await page.mouse.up()
  })
})
