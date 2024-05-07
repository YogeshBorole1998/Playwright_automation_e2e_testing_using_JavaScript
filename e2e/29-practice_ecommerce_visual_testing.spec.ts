import { test, expect, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('Practice E-Commerce Site Visual Testing', () => {
  let page: Page

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test.afterEach(async () => {
    await page.close()
  })

  test('Verify elements on the login page', async () => {
    await page.goto('https://practice.sdetunicorns.com/')
    await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns')
    await expect(page).toHaveURL('https://practice.sdetunicorns.com/')
    await expect(page).toHaveURL(/.*sdetunicorns/)

    // By Text Selector - default matching is case-insensitive and searches for substring.
    const headingText = page.locator('text=Think different. Make different.')
    const headingText2 = page.locator('text=think different. Make different.')
    const headingText3 = page.locator('text="Think different. Make different."')
    const headingText4 = page.locator('text="think different. Make different."') // fail
    const headingTextSubstr = page.locator('text=Think different.')
    expect(await headingText.isVisible()).toBe(true)
    await expect(headingText2).toBeVisible()
    await expect(headingText3).toBeVisible()
    await expect(headingText4).not.toBeVisible()
    await expect(headingTextSubstr).toBeVisible()

    // By Text & CSS Selectors
    const homeTxt = page.locator('#zak-primary-menu >> text=Home')
    const homeTxt2 = page.locator('#zak-primary-menu:has-text("Home")')
    await expect(homeTxt).toBeEnabled()
    await expect(homeTxt2).toBeEnabled()

    // By XPath
    const searchIcon = page.locator(
      "//div[@class='zak-header-actions zak-header-actions--desktop']//a[@class='zak-header-search__toggle']"
    )
    await expect(searchIcon).toBeVisible()

    // Working with multiple elements & nth elements
    const navLinks = page.locator('#zak-primary-menu li[id*=menu]')
    const navLinkusingNth = page
      .locator('#zak-primary-menu li[id*=menu]')
      .nth(3)
    const navLinkusingFirst = page
      .locator('#zak-primary-menu li[id*=menu]')
      .first()
    const navLinkusingLast = page
      .locator('#zak-primary-menu li[id*=menu]')
      .last()
    const expectedLinks = [
      'Home',
      'About',
      'Shop',
      'Blog',
      'Contact',
      'My account'
    ]
    expect(await navLinks.allTextContents()).toEqual(expectedLinks)
    expect(await navLinkusingNth.textContent()).toEqual(expectedLinks[3])
    expect(await navLinkusingFirst.textContent()).toEqual(expectedLinks[0])
    expect(await navLinkusingLast.textContent()).toEqual(expectedLinks[5])

    // Print out all links using for loop
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent())
    }

    // Click on the "Contact" link
    const contactLink = page
      .locator('#menu-item-493')
      .getByRole('link', { name: 'Contact' })

    // const contactLink = page.locator('#menu-item-696').getByRole('link', { name: 'Contact' })
    // const contactLink = page.locator('#zak-mobile-menu').getByText('Contact')

    await contactLink.click()
    await expect(
      page.locator("h3[class='elementor-heading-title elementor-size-default']")
    ).toContainText('Send Us Message')

    //  fill out the input fields and submit
    // await submitForm(
    //   page,
    //   'John Doe',
    //   'johndoe@example.com',
    //   '1234567890',
    //   'Hello, this is a test message.'
    // )

    //  fill out the input fields and submit - using fake or dummy data
    await submitForm(
      page,
      faker.internet.displayName(),
      faker.internet.email(),
      faker.phone.number(),
      faker.lorem.paragraphs(2)
    )

    // verify success message
    const successTxt = page.locator('div[role="alert"]')
    await expect(successTxt).toHaveText(
      'Thanks for contacting us! We will be in touch with you shortly'
    )

    // Check count if there is any error
    expect(test.info().errors.length).toEqual(0)
  })
})

async function submitForm(
  page: Page,
  name: string,
  email: string,
  phone: string,
  message: string
) {
  await page.locator('.contact-name input').fill(name)
  await page.locator('.contact-email input').fill(email)
  await page.locator('.contact-phone input').fill(phone)
  await page.locator('.contact-message textarea').fill(message)
  await page.locator('button[type=submit]').click()
}
