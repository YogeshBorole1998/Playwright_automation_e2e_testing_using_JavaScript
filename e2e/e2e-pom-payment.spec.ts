import { test } from '@playwright/test'
import { LoginPage } from '../Page-Objects/ZeroBank-LoginPage'
import { HomePage } from '../Page-Objects/ZeroBank-HomePage'
import { Navbar } from '../Page-Objects/Components/ZeroBank-Navbar'
import { PaymentPage } from '../Page-Objects/ZeroBank-PaymentPage'

test.describe('New Payment', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let navbar: Navbar
  let paymentPage: PaymentPage

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    navbar = new Navbar(page)
    paymentPage = new PaymentPage(page)

    await loginPage.visit()
    await homePage.clickOnSigninButton()
    await loginPage.login('username', 'password')
    await page.goBack()
    await homePage.navigateToAccountSummary()
  })

  test('should send new payment', async () => {
    // await page.click("#pay_bills_tab");
    await navbar.clickOnTab('Pay Bills')
    await paymentPage.createPayment(
      'bofa',
      'For 47844181491040 Bank of America account',
      '4',
      '10000',
      '2024-04-30',
      'Payment Done'
    )
    await paymentPage.assertSuccessMsg()
  })
})
