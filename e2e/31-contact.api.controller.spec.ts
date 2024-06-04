import { test, expect, Page, APIResponse } from '@playwright/test'
import apiController from '../controller/api.controller'

test.describe('Practice E-Commerce Site using API Controller Testing', () => {
  let randomPerson: APIResponse

  test.beforeAll(async () => {
    // Initialize the API request context with a base URL
    await apiController.init()
    randomPerson = await apiController.getUsers()

    const createdUser = await apiController.createUser(
      'Learn Playwright',
      false
    )
    console.log(createdUser) // { title: 'Learn Playwright', completed: 'false', userId: '1', id: 201 }
  })

  test('@API Submit Contact Form with Random Data using API Controller', async ({
    page
  }) => {
    await page.goto('https://practice.sdetunicorns.com/contact/')

    //  fill out the input fields and submit - using fake or dummy data
    await submitForm(
      page,
      randomPerson['name'],
      randomPerson['email'],
      randomPerson['phone'],
      randomPerson['website']
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
