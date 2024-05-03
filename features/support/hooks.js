const { After, Before, AfterStep, Status } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')

// Before hook: Executed before all scenarios
Before(async function () {
  console.log('Launching browser and initializing test environment...')
  const browser = await playwright.chromium.launch({
    headless: false // Launch the browser in non-headless mode for debugging
  })
  // Create a new browsing context & new page within the context
  const context = await browser.newContext()
  this.page = await context.newPage() // world class constructor concept is used here
})

// AfterStep hook: Executed after each step
AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    const buffer = await this.page.screenshot() // Capture a screenshot
    await this.page.screenshot({ path: 'screenshot1.png' }) // Save the screenshot to a file
    this.attach(buffer.toString('base64'), 'base64:image/png') // Attach the screenshot to the test report
    console.log('Step failed! Screenshot captured.') // Log message indicating that a screenshot is captured on step failure
  }
})

// After hook: Executed after all scenarios
After(async function () {
  console.log('Test execution completed. Closing browser...') // Log message indicating completion of test execution
})

// In selenium webdriver we want to quit browser at last using driver.quit(); But In Playwrite its automatically closed & clear all the catche data.
