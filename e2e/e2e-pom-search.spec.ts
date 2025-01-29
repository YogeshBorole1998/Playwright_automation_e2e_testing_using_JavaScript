import { test } from '@playwright/test'
import { LoginPage } from '../Page-Objects/ZeroBank-LoginPage'
import { HomePage } from '../Page-Objects/ZeroBank-HomePage'

test.describe('Search Results', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await loginPage.visit()
  })

  test('should find search results', async () => {
    await homePage.searchFor('Bank')
    await homePage.assertNumberOfLinks(2)
  })
})
