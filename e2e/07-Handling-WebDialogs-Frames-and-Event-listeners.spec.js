const { test, expect } = require('@playwright/test')

// test.describe.configure({mode:'parallel'});
// test.describe.configure({ mode: "serial" });

test.describe('Playwright Handling & Validating Web dialogs, Frames & Event listeners', () => {
  test('@Web Popup validations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    // Came back on AutomationPractice site
    await page.goto('http://google.com')
    await page.goBack()
    // await page.goForward();
    await page.reload()

    await expect(page.locator('#displayed-text')).toBeVisible() // Check Hide/Show input is visible
    await page.locator('#hide-textbox').click() // Click on Hide Button
    await expect(page.locator('#displayed-text')).toBeHidden() // verify the element is hidden now
    // await page.pause();

    // Handle Confirm Popup dialog box
    /**
     * on method helps us to listen for events so it will emit when the event occurs in the webpage.
     * You can also able to give dismiss() instead of accept()
     *
     * Below line of code sets up an event listener for any dialog boxes that appear during the test execution. When a dialog box appears,
     * the event listener triggers the accept() method on the dialog, which simulates clicking the "OK" button to confirm the dialog.
     */
    page.on('dialog', (dialog) => dialog.accept()) // Hello , Are you sure you want to confirm? --> OK
    await page.locator('#confirmbtn').click()

    // Mouse Hover :
    await page.locator('#mousehover').hover()

    // Handle & automate frames
    const framesPage = page.frameLocator('#courses-iframe')
    await framesPage.locator('.new-navbar-highlighter').first().click() // Click on All Access Plan link inside frame
    const textCheck = await framesPage.locator('.text h2').textContent() // Join 13,522 Happy Subscibers!
    console.log(textCheck.split(' ')[1]) // 13,522
  })

  test('Screenshot & Visual comparision', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    // Verifying that Hide/Show Input Box is visible on the page
    await expect(page.locator('#displayed-text')).toBeVisible()

    // Taking a screenshot of the visible element Hide/Show Input Box & Stored in same directory
    await page
      .locator('#displayed-text')
      .screenshot({ path: 'partialScreenshot.png' })
    // Clicking on the hide button to hide the Hide/Show Input Box
    await page.locator('#hide-textbox').click()

    // Taking a screenshot of the entire page after hiding the textbox and stored in same directory
    await page.screenshot({ path: 'screenshot.png' })
    await expect(page.locator('#displayed-text')).toBeHidden()
  })

  test('Visual Testing', async ({ page }) => {
    //make payment when you 0 balance
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    expect(await page.screenshot()).toMatchSnapshot('landing.png', {
      maxDiffPixels: 10000
    })
  })
})
