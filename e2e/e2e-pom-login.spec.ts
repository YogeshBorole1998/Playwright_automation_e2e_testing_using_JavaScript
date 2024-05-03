import { test } from '@playwright/test'
import { LoginPage } from '../Page-Objects/ZeroBank-LoginPage'
import { HomePage } from '../Page-Objects/ZeroBank-HomePage'
import { Navbar } from '../Page-Objects/Components/ZeroBank-Navbar'

test.describe('Login/Logout Flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let navbar: Navbar

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    navbar = new Navbar(page)

    await loginPage.visit()
  })

  test('Negative Scenario for login', async () => {
    await homePage.clickOnSigninButton()
    await loginPage.login('invalid-user', 'invalid-pass')
    await loginPage.assertErrorMsg()
  })

  test('Positive Scenario for login & logout', async ({ page }) => {
    await homePage.clickOnSigninButton()
    await loginPage.login('username', 'password')
    await page.goBack()
    await loginPage.wait(3000) // wait method called from abstract class
    await homePage.navigateToAccountSummary()
    await navbar.assertAccountSummaryTabVisible()
  })
})
