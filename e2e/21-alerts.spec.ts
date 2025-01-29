import { expect, test } from '@playwright/test'

test.describe('Alerts', () => {
  test('Simple alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts')
    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })
    await page.locator('#alertButton').click()
  })

  test('Confirm alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts')
    page.on('dialog', async (dialog) => {
      await dialog.dismiss()
    })
    await page.locator('#confirmButton').click()
    await expect(page.locator('#confirmResult')).toHaveText(
      'You selected Cancel'
    )
  })

  test('Prompt alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts')
    page.on('dialog', async (dialog) => {
      await dialog.accept('Skillmea')
    })
    await page.locator('#promtButton').click()
    await expect(page.locator('#promptResult')).toHaveText(
      'You entered Skillmea'
    )
  })
})
