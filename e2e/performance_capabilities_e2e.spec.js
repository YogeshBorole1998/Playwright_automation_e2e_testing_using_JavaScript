const { test } = require('@playwright/test')
const fs = require('fs')
const path = require('path')

test.describe('Capabilities - Performance Testing', () => {
  test('Access the running devtools and request CDP Performance metrics', async ({
    page
  }) => {
    // Create a new connection to an existing CDPSession to enable the Performance measurements
    const client = await page.context().newCDPSession(page)

    // Tell the DevTools session to record performance metrics
    // https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-getMetrics
    await client.send('Performance.enable')

    await page.goto('https://www.google.com')
    await page.click('[aria-label="Search"]')
    await page.fill('[aria-label="Search"]', 'Playwright')

    await Promise.all([
      page.waitForNavigation(),
      page.press('[aria-label="Search"]', 'Enter')
    ])

    console.log('\nx ==== DevTools: Performance.getMetrics ==== x\n')
    // Get the performance metrics
    const performanceMetrics = await client.send('Performance.getMetrics')
    console.log(performanceMetrics.metrics)
  })

  test('Capture Performance Timeline Trace during test excution and demonstrate marks', async ({
    page,
    browser
  }) => {
    console.log('\nx ==== DevTools: startTracing ==== x\n')
    await browser.startTracing(page, {
      path: './trace.json',
      screenshots: true
    })

    await page.goto('https://www.google.com')

    // Use performance.mark API to create a mark in the browser's performance timeline
    await page.evaluate(() => window.performance.mark('perf:start'))

    await page.click('[aria-label="Search"]')
    await page.fill('[aria-label="Search"]', 'Playwright')

    // Performance.mark API
    await page.evaluate(() => window.performance.mark('perf:stop'))

    // Performance.measure API
    await page.evaluate(() =>
      window.performance.measure('overall', 'perf:start', 'perf:stop')
    )

    // Get All Performance Marks Including Google's
    const getAllMarksJson = await page.evaluate(() =>
      JSON.stringify(window.performance.getEntriesByType('mark'))
    )
    const getAllMarks = JSON.parse(getAllMarksJson)
    console.log('window.performance.getEntriesByType("mark")', getAllMarks)

    // Get All Performance Measures Including Google's
    const getAllMeasuresJson = await page.evaluate(() =>
      JSON.stringify(window.performance.getEntriesByType('measure'))
    )
    const getAllMeasures = JSON.parse(getAllMeasuresJson)
    console.log(
      'window.performance.getEntriesByType("measure")',
      getAllMeasures
    )

    // Press Enter to search
    await Promise.all([
      page.waitForNavigation(),
      page.press('[aria-label="Search"]', 'Enter')
    ])

    console.log('\nx ==== DevTools: stopTracing ==== x\n')
    await browser.stopTracing()
  })

  test('Route Image Replacement', async ({ page, context }) => {
    await context.addInitScript(() => delete window.navigator.serviceWorker)

    const newClient = await page.context().newCDPSession(page)

    // Tell the DevTools session to record performance metrics
    // https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-getMetrics
    await newClient.send('Overlay.setShowFPSCounter', { show: true })

    // URL to replace
    const remoteFilePath =
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    // Local (override) file to use instead
    const localFilePath = path.join(__dirname, './bingLogo.png')

    await page.route(
      'https://www.google.com/images/branding/googlelogo/2x/*.png',
      (route) => {
        const url = route.request().url()
        console.log(`Intercepted: ${url}`)

        if (url === remoteFilePath && !url.match(localFilePath)) {
          route.fulfill({
            body: fs.readFileSync(localFilePath)
          })
        } else {
          route.continue()
        }
      }
    )

    await page.goto('https://www.google.com')
    await page.click('[aria-label="Search"]')
    await page.fill('[aria-label="Search"]', 'Playwright')

    await Promise.all([
      page.waitForNavigation(),
      page.press('[aria-label="Search"]', 'Enter')
    ])

    await page.screenshot({ path: 'route-image-replacement.png' })
  })
})
