import { test, expect, Locator } from '@playwright/test'

test.describe('Element Existance Automation Testing', () => {
  test('check if an element exists on the page', async ({ page }) => {
    await page.goto('https://www.google.com/')
    /**
     * https://playwright.dev/docs/api/class-page#page-is-visible
     *
     * Returns whether the element is visible. selector that does not match any elements is considered not visible.
     * Deprecated : await page.isVisible(selector) does not wait for the element to become visible and returns immediately.
     *
     * page.isVisible is not an assertion. isVisible does just return the visibility state in form of a boolean rather than throwing when the condition is not met.
     */

    // verify Google Search Button is available on page
    const googleSearchBtn = page.getByRole('button', { name: 'Google Search' })

    // Scenario : 1
    await expect(googleSearchBtn).toBeVisible()
    // Scenario : 2
    await expect(googleSearchBtn).toHaveCount(1)

    // Scenario : 3
    if (await page.$('button[aria-label="Google Search"]')) {
      console.log('Search button is visible.')
    }
    // Scenario : 4
    if (
      (await page.locator('button[aria-label="Google Search"]').count()) > 0
    ) {
      console.log('Search button is visible.')
    }
    // Scenario : 5
    if (await page.locator('button[aria-label="Google Search"]').isVisible()) {
      console.log('Search button is visible.')
    }

    await page.goto('https://omayo.blogspot.com/')
    // At least one item in the list is visible.
    await expect(page.locator('.widget-content').first()).toBeVisible()

    // At least one of the two elements is visible, possibly both.
    await expect(
      page
        .getByRole('button', { name: 'LogIn' })
        .or(page.locator('.widget-content'))
        .first()
    ).toBeVisible()
  })

  // conditionally click an element depending on which one is visible?
  test('Click one of the elements in the array using promise.race', async ({
    page
  }) => {
    await page.goto('https://the-internet.herokuapp.com/disappearing_elements')

    // Builds a promise that can then be passed into the Array of promises
    const waitForLocator = async (locator: Locator): Promise<Locator> => {
      await locator.waitFor()
      return locator
    }

    // Promise.race() method which accepts an Array of Promises, and whichever promise returns soonest gets fulfilled.
    // It's useful when you want the first async task to complete, but do not care about its eventual state (i.e. it can either succeed or fail).
    let returnedLocator = await Promise.race(
      // Array promises/locators
      [
        waitForLocator(page.getByRole('link', { name: 'Gallery' })),
        waitForLocator(page.getByRole('link', { name: 'Portfolio' }))
      ]
    )

    // console.log(await returnedLocator.innerText());
    await returnedLocator.click()

    // console.log(page.url());
    await expect(page).toHaveURL(/.*gallery|.*portfolio/)
  })
})

test('Click one of the elements that is visible out of two', async ({
  page
}) => {
  await page.goto('https://the-internet.herokuapp.com/disappearing_elements')

  const gallery = page.getByRole('link', { name: 'Gallery' })
  const portfolio = page.getByRole('link', { name: 'Portfolio' })

  if (await gallery.isVisible()) {
    await gallery.click()
  } else if (await portfolio.isVisible()) {
    await portfolio.click()
  }

  await expect(page).toHaveURL(/.*gallery|.*portfolio/)
})

test('assert that an element is NOT on the page', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/disappearing_elements')

  const portfolio = page.getByRole('link', { name: 'conatact' })
  await expect(portfolio).toHaveCount(0)
  expect(await page.getByRole('link', { name: 'conatact' }).count()).toEqual(0)
  await expect(page.getByRole('link', { name: 'conatact' })).not.toBeVisible()
  expect(page.getByRole('link', { name: 'conatact' })).not.toBeAttached()
  expect(page.getByRole('link', { name: 'conatact' })).toBeHidden()
  expect(await page.getByRole('link', { name: 'conatact' }).isVisible()).toBe(
    false
  )
})
