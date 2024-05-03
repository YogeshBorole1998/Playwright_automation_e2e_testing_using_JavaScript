import { test, expect } from '@playwright/test'

test.describe('Upload', () => {
  test('Upload file', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download')
    await page.locator('#uploadFile').setInputFiles(['./download.xlsx'])
    await expect(page.locator('#uploadedFilePath')).toBeVisible()
  })
})
