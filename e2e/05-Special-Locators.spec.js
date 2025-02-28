const { test, expect } = require('@playwright/test')

test('@Web Playwright special locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/')

  // Get By Label to locate the element
  await page.getByLabel('Check me out if you Love IceCreams!').check()
  await page.getByLabel('Employed').check()
  await page.getByLabel('Gender').selectOption('Female')

  // Get By Placeholder to locate the element
  await page.getByPlaceholder('Password').fill('abc123')

  // Get By Role to locate the element - role & name of that button
  await page.getByRole('button', { name: 'Submit' }).click()

  // Get By Text to locate the element
  await expect(
    page.getByText('Success! The Form has been submitted successfully!.')
  ).toBeVisible()

  // Get By Role to locate the element - role & name of that link
  await page.getByRole('link', { name: 'Shop' }).click()

  // Get By Tag Name
  await page
    .locator('app-card')
    .filter({ hasText: 'Nokia Edge' })
    .getByRole('button')
    .click()
  // await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();
  // Here above if you not given {name: 'Add'} that is also fine because there is only one add button in Nokia card.
})
