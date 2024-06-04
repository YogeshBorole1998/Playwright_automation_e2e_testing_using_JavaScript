import { test, expect } from '@playwright/test'

test.describe('Getting Value of Input Element and Page Url', () => {
  test('Verify value of input element', async ({ page }) => {
    await page.goto('https://omayo.blogspot.com/')
    await expect(page.locator("input[value='Cancel']")).toHaveValue('Cancel')

    const inputValue = await page.inputValue("input[value='Cancel']")
    expect(inputValue).toEqual('Cancel')
    await page.locator("input[value='Cancel']").inputValue()
    expect(await page.locator("input[value='Cancel']").inputValue()).toEqual(
      'Cancel'
    )
  })

  test('Get current page url', async ({ page }) => {
    await page.goto('https://omayo.blogspot.com/')
    console.log(page.url()) // https://omayo.blogspot.com/
    await expect(page).toHaveURL('https://omayo.blogspot.com/')
    await expect(page).toHaveURL(/.*omayo/)

    const href = await page.evaluate(() => document.location.href)
    console.log(href) // https://omayo.blogspot.com/
  })
})
