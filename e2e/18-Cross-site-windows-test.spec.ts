import { firefox, test, webkit } from '@playwright/test'

test.describe('Cross-Site Functionality Test', () => {
  test('Testing multiple browser windows functionality between two different websites', async ({
    browser
  }) => {
    // Open two browsers, each with its own context and page
    const user1Context = await browser.newContext()
    const user1Page = await user1Context.newPage()
    const user2Context = await browser.newContext()
    const user2Page = await user2Context.newPage()

    // Open different websites for both users
    await user1Page.goto('https://www.google.com')
    await user2Page.goto('https://www.saucedemo.com/')
  })

  test('Multiple windows and tabs mix it', async ({
    page,
    context,
    browser
  }) => {
    // this opens normally a full browser with window and tab (default way)
    await page.goto('https://duckduckgo.com/')

    // this creates a new tab from the same window (context) as line above
    const page2 = await context.newPage()
    await page2.goto('https://martioli.com/')

    // this sets up a new browser window with a tab.
    // Independent from the lines above
    const page3Context = await browser.newContext()
    const page3 = await page3Context.newPage()
    await page3.goto('https://github.com/adrianmaciuc')
  })

  test('Multiple browser drivers', async () => {
    const browser = await webkit.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://martioli.com/')

    const browser2 = await firefox.launch()
    const context2 = await browser2.newContext()
    const page2 = await context2.newPage()
    await page2.goto('https://martioli.com/')
  })
})
