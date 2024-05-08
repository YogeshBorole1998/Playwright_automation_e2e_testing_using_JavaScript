import { test, expect } from '@playwright/test'
const path = require('path')

test.describe('Upload', () => {
  test('Upload file', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download', { timeout: 50000 })
    await page.locator('#uploadFile').setInputFiles(['./download.xlsx'])
    await expect(page.locator('#uploadedFilePath')).toBeVisible()
  })

  test('should upload a test file - Regular Upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload')

    // Provide test file path
    const filePath = path.join(__dirname, '../download.xlsx')

    // upload test file
    await page.setInputFiles('#file-upload', filePath)

    // click on upload button
    await page.locator('#file-submit').click()

    // WRONG WAY - Hardcoded sleep or wait
    await page.waitForTimeout(5000)

    // Conditional wait
    await page
      .locator('#uploaded-files')
      .waitFor({ state: 'visible', timeout: 10000 })

    // Assertion wait
    await expect(page.locator('#uploaded-files')).toHaveText('download.xlsx', {
      timeout: 10000
    })
  })

  // Test to upload files (download.xlsx and screenshot.png) to the-internet.herokuapp.com/upload
  const fileName = ['download.xlsx', 'screenshot.png']
  for (const name of fileName) {
    test(`should upload a ${name} file`, async ({ page }) => {
      await page.goto('https://the-internet.herokuapp.com/upload')
      const filePath = path.join(__dirname, `../${name}`)
      await page.setInputFiles('#file-upload', filePath)
      await page.locator('#file-submit').click()
      await expect(page.locator('#uploaded-files')).toHaveText(name)
    })
  }
})
