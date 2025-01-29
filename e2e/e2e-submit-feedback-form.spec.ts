const { test, expect } = require('@playwright/test')

test.describe('Feedback Form', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })

  test('Reset Feedback form', async ({ page }) => {
    await page.click('#feedback')
    await page.fill('#name', 'some name')
    await page.fill('#email', 'some email@gmail.com')
    await page.fill('#subject', 'some subject')
    await page.fill('#comment', 'some nice comment about the application')
    await page.click("input[name='clear']")

    const selectors = ['#name', '#email', '#subject']

    selectors.forEach(async (selector) => {
      const input = await page.locator(selector)
      await expect(input).toBeEmpty()
    })
  })

  test('submit feedback form', async ({ page }) => {
    await page.click('#feedback')
    await page.fill('#name', 'some name')
    await page.fill('#email', 'some email@gmail.com')
    await page.fill('#subject', 'some subject')
    await page.fill('#comment', 'some nice comment about the application')
    await page.click("input[name='submit']")

    const verifyMsg = await page.locator('.offset3.span6').textContent()
    console.log(verifyMsg)
    expect(verifyMsg).toContain('Thank you for your comments, some name.')
    expect(verifyMsg).toContain(
      'They will be reviewed by our Customer Service staff and given the full attention that they deserve.'
    )
  })
})
