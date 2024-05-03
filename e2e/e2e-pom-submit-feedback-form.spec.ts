const { test } = require('@playwright/test')

import { FeedbackPage } from '../Page-Objects/ZeroBank-FeedbackPage'
import { LoginPage } from '../Page-Objects/ZeroBank-LoginPage'
import { HomePage } from '../Page-Objects/ZeroBank-HomePage'

test.describe('Feedback Form', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let feedbackPage: FeedbackPage
  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)

    await loginPage.visit()
    await feedbackPage.openFeedbackForm()
  })

  test('Reset Feedback form', async () => {
    await feedbackPage.fillFeedbackForm(
      'some name',
      'some email@gmail.com',
      'some subject',
      'some nice comment about the application'
    )
    await feedbackPage.clearFeedbackForm()

    const selectors = ['#name', '#email', '#subject']
    await feedbackPage.assertReset(selectors)
  })

  test('submit feedback form', async () => {
    await feedbackPage.fillFeedbackForm(
      'some name',
      'some email@gmail.com',
      'some subject',
      'some nice comment about the application'
    )
    await feedbackPage.submitFeedbackForm()
    await feedbackPage.verifyFeedbackSentMsg()
  })
})
