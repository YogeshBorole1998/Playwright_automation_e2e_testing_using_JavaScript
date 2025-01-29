import { test, expect, chromium, devices } from '@playwright/test'

test.describe('Getting Value of Input Element', () => {
  test('01.Get a collection of elements', async ({ page }) => {
    async function parse(url: string) {
      const browser = await chromium.launch()
      const page = await browser.newPage()

      await page.goto(url)
      await page.waitForSelector('img')
      // TODO: get somehow collection of elements
      return await page.$$('img')
    }

    const counts = await parse('https://www.automationexercise.com/')
    expect(counts.length).toBe(44)

    // Approch -2
    await page.goto('https://www.automationexercise.com/')
    await page.waitForSelector('img')

    const imgCounts = await page.$$('img')
    expect(imgCounts.length).toBe(44)

    // Approch -3
    const imageList = await page.locator('img')
    console.log('Number of images on the page : ', await imageList.count())
  })

  test('02.should pause the test script for 3 seconds before continue running it', async ({
    page
  }) => {
    await page.goto('https://omayo.blogspot.com/')
    await page.waitForTimeout(4000)
    await page.locator("input[title='search'][value='Search']").click()
    await expect(page.url()).toContain('search')

    // Approch -2
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    await delay(4000) // <-- here we wait 4s

    await page.goBack()
  })

  test('03.should able to select an element by Id', async ({ page }) => {
    await page.goto('https://omayo.blogspot.com/')

    // Using page.locator with CSS Selector
    await page.locator('#radio1').click()
    await page.click('#radio2')

    // Using page.locator with XPath
    await page.locator('//*[@id="radio1"]').click()

    // Using page.locator with id Attribute Locator Note - Attribute selectors are not CSS selectors!
    await page.locator('id=radio2').click()
  })

  test('04.How to achieve browser resizing in run time using playwright? in a e2e test run', async ({
    page
  }) => {
    // Set the initial viewport size to 600x600 pixels
    page.setViewportSize({ width: 600, height: 600 })
    // Perform any actions you need to do at this initial viewport size OR do stuff then resize to a particular device size
    await page.goto('https://omayo.blogspot.com/')
    await page.locator('#ta1').fill('Hey Yogesh..!!')

    // Resize the viewport to a particular device size, in this case, iPhone X
    page.setViewportSize(devices['iPhone X'].viewport)
    // Navigate to the specified URL after resizing the viewport
    await page.goto('https://omayo.blogspot.com/')
    await page.locator('#ta1').fill('Hey Yogesh..!!')
    await page.close()

    // Add any additional actions or assertions needed for your test
    // Example: await expect(page).toHaveSelector('selector');
  })

  test('05.costume viewport size', async ({ page }) => {
    // Get the current viewport size
    const viewport = page.viewportSize()

    if (viewport) {
      const newWidth = viewport.width - 1000
      const newHeight = viewport.height - 400

      // Set the new viewport size
      await page.setViewportSize({ width: newWidth, height: newHeight })
    }

    await page.goto('https://omayo.blogspot.com/')
    await page.locator('#ta1').fill('Hey Yogesh..!!')
  })

  test('06.auto-scroll to bottom of infinite-scroll page', async () => {
    // Launch browser instance
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()

    // Open a new page
    const page = await context.newPage()

    // Navigate to YouTube
    await page.goto('https://omayo.blogspot.com')

    // Scroll down the page multiple times
    for (let i = 0; i < 3; i++) {
      await page.mouse.wheel(0, 15000)
      await page.waitForTimeout(2000) // wait for 2 seconds
    }

    // Wait for 5 seconds to observe the result
    await page.waitForTimeout(5000)

    // Close context and browser
    await context.close()
    await browser.close()
  })
})
