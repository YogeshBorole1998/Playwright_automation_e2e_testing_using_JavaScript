import { Page, test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('Automation Excercise Automation E2E', () => {
  const validLoginEmail = 'playwright123@gmail.com'
  const loginPassword = 'Test@1998'
  const randomEmail = faker.internet.email()

  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/')

    await expect(page).toHaveTitle('Automation Exercise')
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()

    await page.getByRole('link', { name: 'Signup / Login' }).click()
    await expect(page.getByText('Login to your account')).toBeVisible()
  })

  async function login(
    page: Page,
    email: string = validLoginEmail,
    password: string = loginPassword
  ) {
    await page.fill('input[data-qa="login-email"]', email)
    await page.fill('input[data-qa="login-password"]', password)
    await page.click('button[data-qa="login-button"]')
  }

  async function selectRandomDOB(
    page: Page,
    daySelector: string,
    monthSelector: string,
    yearSelector: string
  ) {
    // Generate a random birthdate (18-80 years old)
    const randomDate = faker.date.birthdate({ min: 18, max: 80, mode: 'age' })

    // Extract day, month, and year
    const day = randomDate.getDate().toString()
    const month = (randomDate.getMonth() + 1).toString() // 1-based index for months
    const year = randomDate.getFullYear().toString()

    // Select values in dropdowns
    await page.selectOption(daySelector, day)
    await page.selectOption(monthSelector, month)
    await page.selectOption(yearSelector, year)
  }

  async function uploadFile(page: Page, filePath: string) {
    const fileInput = page.locator('input[name="upload_file"]')
    await fileInput.setInputFiles(filePath)
  }

  test('Test Case 1: Register User', async ({ page }) => {
    const personFullName = faker.person.fullName()

    await page.getByPlaceholder('Name').fill(personFullName)
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(randomEmail)
    await page.getByRole('button', { name: 'Signup' }).click()

    await expect(page.locator('.text-center').first().locator('b')).toHaveText(
      'Enter Account Information'
    )

    const title = faker.person.prefix() === 'Mr.' ? 'id_gender1' : 'id_gender2'

    await page.locator(`#${title}`).click()
    await expect(page.locator(`#${title}`)).toBeChecked()

    await page.getByLabel('Password').fill(faker.internet.password())
    await selectRandomDOB(page, '#days', '#months', '#years')

    await page
      .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
      .check()
    await expect(
      page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
    ).toBeChecked()

    await page
      .getByRole('checkbox', {
        name: 'Receive special offers from our partners!'
      })
      .check()
    await expect(
      page.getByRole('checkbox', {
        name: 'Receive special offers from our partners!'
      })
    ).toBeChecked()

    await page.locator('#first_name').fill(personFullName.split(' ')[0])
    await page.locator('#last_name').fill(personFullName.split(' ')[1])
    await page.locator('#address1').fill(faker.location.streetAddress())
    await page.locator('#country').selectOption({ label: 'Australia' })
    await page.locator('#state').fill(faker.location.state())
    await page.locator('#city').fill(faker.location.city())
    await page.locator('#zipcode').fill(faker.location.zipCode())
    await page.locator('#mobile_number').fill(faker.phone.number())

    await page.getByRole('button', { name: 'Create Account' }).click()
    await expect(page.locator('.text-center').first().locator('b')).toHaveText(
      'Account Created!'
    )
    const accountCreated = await page.locator('[data-qa="account-created"]')

    await expect(accountCreated).toHaveText('Account Created!')
    await expect(accountCreated).toHaveCSS('color', 'rgb(0, 128, 0)')

    const congratulationsMsg = await page.locator('p', {
      hasText:
        'Congratulations! Your new account has been successfully created!'
    })
    await expect(congratulationsMsg).toBeVisible()

    await page.getByRole('link', { name: 'Continue' }).click()
    await expect(page.getByText(`Logged in as ${personFullName}`)).toBeVisible()
    await expect(
      page
        .getByRole('listitem')
        .filter({ hasText: `Logged in as ${personFullName}` })
    ).toBeVisible()

    await page.locator('a', { hasText: 'Delete Account' }).click()

    await expect(page.locator('.text-center').first().locator('b')).toHaveText(
      'Account Deleted!'
    )
    const accountDeleted = await page.locator('[data-qa="account-deleted"]')

    await expect(accountDeleted).toHaveText('Account Deleted!')
    await expect(accountDeleted).toHaveCSS('color', 'rgb(0, 128, 0)')

    const deletionsMsg = await page.locator('p', {
      hasText: 'Your account has been permanently deleted!'
    })
    await expect(deletionsMsg).toBeVisible()

    await page.getByRole('link', { name: 'Continue' }).click()
    await expect(
      page.getByRole('img', { name: 'Website for automation practice' })
    ).toBeVisible()
  })

  test('Test Case 2: Login User with correct email and password', async ({
    page
  }) => {
    await login(page)

    await expect(page.getByText('Logged in as Yogesh Borole')).toBeVisible()
    await expect(
      page
        .getByRole('listitem')
        .filter({ hasText: 'Logged in as Yogesh Borole' })
    ).toBeVisible()
  })

  test('Test Case 3: Login User with incorrect email and password', async ({
    page
  }) => {
    await login(page, 'incorrect@gmail.com')

    await expect(page.locator('form').first().locator('p')).toHaveText(
      /Your email or password is incorrect!/i
    )
    await expect(page.locator('form').first().locator('p')).toHaveCSS(
      'color',
      'rgb(255, 0, 0)'
    )
  })

  test('Test Case 4: Logout User', async ({ page }) => {
    await login(page)

    await expect(page.getByText('Logged in as Yogesh Borole')).toBeVisible()
    await expect(
      page
        .getByRole('listitem')
        .filter({ hasText: 'Logged in as Yogesh Borole' })
    ).toBeVisible()

    await page.getByRole('link', { name: 'Logout' }).click()
    await expect(page).toHaveURL(/login/)
  })

  test('Test Case 5: Register User with existing email', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Yogesh Borole')
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(validLoginEmail)
    await page.getByRole('button', { name: 'Signup' }).click()

    await expect(page.locator('form').locator('p').first()).toHaveText(
      'Email Address already exist!'
    )
    await expect(page.locator('form').locator('p').first()).toHaveCSS(
      'color',
      'rgb(255, 0, 0)'
    )
  })

  test('Test Case 6: Contact Us Form', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact Us' }).click()
    await expect(
      page.getByRole('heading', { name: 'Get In Touch' })
    ).toBeVisible()

    await page.getByPlaceholder('Name').fill(faker.person.fullName())
    await page
      .getByRole('textbox', { name: 'Email', exact: true })
      .fill(randomEmail)
    await page.getByPlaceholder('Subject').fill(faker.lorem.sentence())
    await page
      .getByRole('textbox', { name: 'Your Message Here' })
      .fill(faker.lorem.paragraph())
    await uploadFile(page, './partialScreenshot.png')

    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.dismiss().catch(() => {})
    })
    await page.getByRole('button', { name: 'Submit' }).click()

    // page.on('dialog', async dialog => {
    //   console.log(`Alert message: ${dialog.message()}`);
    //   await dialog.accept();
    // });

    // await page.locator('.submit_form').click();

    // // await expect(page.locator('.status')).toContainText('Success! Your details have been submitted successfully.');
    // // await page.getByRole('link', { name: 'Home' }).click()
  })

  test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    page.on('dialog', async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`)
      await dialog.accept()
    })
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click()
    await page.pause()
  })
})
