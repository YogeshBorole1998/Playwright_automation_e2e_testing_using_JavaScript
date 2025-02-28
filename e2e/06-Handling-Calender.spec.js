const { test, expect } = require('@playwright/test')

test.describe('Playwright Handling Calendar tests', () => {
  test('@Web Calendar Validations', async ({ page }) => {
    const year = '2028'
    const monthNumber = '4' // April is Month number 4 in the calendar
    const dayToSelect = '15'
    const expectedDate = [monthNumber, dayToSelect, year]

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    // Click on the date picker button to open the date picker calendar
    await page.locator('.react-date-picker__inputGroup').click()

    // Click on the year i.e. April 2024
    await page.locator('.react-calendar__navigation__label').click()
    // Click on the year i.e. 2024
    await page.locator('.react-calendar__navigation__label').click()

    // Select the Year given by user
    await page.getByText(year).click()

    // Click on the month on the calender
    await page
      .locator('.react-calendar__year-view__months__month')
      .nth(Number(monthNumber - 1))
      .click()

    // Click on the dat on the calender
    await page.locator("//abbr[text()='" + dayToSelect + "']").click()

    const inputs = page.locator('.react-date-picker__inputGroup input') // value = "2024-04-14"
    for (let index = 0; index < inputs.length; index++) {
      const value = inputs[index].getAttribute('value')
      expect(value).toEqual(expectedDate[index])
    }
  })
})
