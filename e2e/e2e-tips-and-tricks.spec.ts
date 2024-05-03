import { expect, test } from '@playwright/test'

test.describe('Advanced Tips & Tricks Section', () => {
  test('Test Info Object', async ({ page }, testInfo) => {
    await page.goto('http://www.example.com')
    console.log(testInfo)
    console.log(testInfo.title) // TestInfo Object
    console.log(testInfo.status) // passed
  })

  test('Test Skip Browser Annotation', async ({ page, browserName }) => {
    // Skip the test if the browser is Firefox
    test.skip(
      browserName === 'firefox', // Condition to skip the test
      'Feature not ready to run inside firefox browser' // Reason for skipping the test
    )

    // Proceed with test execution if the browser is not Firefox
    await page.goto('http://www.example.com')
  })

  test('Test Fixme Annotation', async ({ page, browserName }) => {
    // Mark the test as needing revision if the browser is Firefox
    test.fixme(
      browserName === 'firefox', // Condition to mark the test as needing revision
      'Test is not stable, needs revision' // Reason for marking the test as needing revision
    )

    // Proceed with test execution regardless of browser
    await page.goto('http://www.example.com')
  })

  // Parametrized Tests :
  const peoples = ['Yogesh', 'Sama', 'Dhivya', 'Akshitha', 'Varun']
  for (const name of peoples) {
    test(`Running test for: ${name}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/')
      await page.fill('#searchTerm', `${name}`)
      await page.keyboard.press('Enter')
      await expect(page.locator("div[class='top_offset'] h2")).toContainText(
        'Search Results:'
      )
    })
  }

  test('Mouse Movement Simulation', async ({ page }) => {
    await page.goto('http://www.example.com')
    await page.mouse.move(0, 0)
    await page.mouse.down()
    await page.mouse.move(0, 100)
    await page.mouse.up()
  })

  test('Multiple Browser Tabs inside one browser', async ({ browser }) => {
    const context = await browser.newContext()
    const page1 = await context.newPage()
    await page1.goto('http://www.example.com')
    const page2 = await context.newPage()
    await page2.goto('http://www.example.com')
    await page1.waitForTimeout(3000)
  })

  test('Data Helpers - Get Random Number & String', async ({ browser }) => {
    const randomNumber = await getRandomNumber()
    console.log(randomNumber)

    const randomString = await getRandomString(5)
    console.log(randomString)
  })
})

// Generates a random number between 1 and 1000 (inclusive).
async function getRandomNumber() {
  return Math.floor(Math.random() * 1000 + 1)
}

async function getRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

// Device Emulation : npx playwright open --device="iPhone 11" wikipedia.org
// Generate PDF Files : npx playwright pdf http://www.example.com example-file.pdf
// Generate Customized Screenshots : npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000 http://www.example.com example-img.png
// Emulate Browser Language & Timezone : npx playwright open --lang="en-US" --timezone="Asia/Kolkata" http://www.example.com
