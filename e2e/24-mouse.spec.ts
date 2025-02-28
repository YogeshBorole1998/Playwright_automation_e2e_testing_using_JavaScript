import { test } from '@playwright/test'

test.describe('Mouse', () => {
  test('Mouse paint', async ({ page }) => {
    await page.goto('https://jspaint.app/')
    await page.mouse.move(200, 200)
    await page.mouse.down()
    await page.mouse.move(400, 200)
    await page.mouse.move(400, 400)
    await page.mouse.move(200, 400)
    await page.mouse.move(200, 200)
    await page.mouse.up()
  })

  // Write a test
  // Skip Because of Captcha Handle Issue
  test.fixme('Mouse actions in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.google.com/search?q=testers+talk')

    // click
    //await page.getByRole('link',{name:'Testers Talk'}).first().click();

    // double click
    //await page.getByRole('link',{name:'Testers Talk'}).first().dblclick();

    // mouse right click
    // await page.getByRole('link',{name:'Testers Talk'}).first().click({button:'right'})

    // mouse middle click
    //await page.getByRole('link',{name:'Testers Talk'}).first().click({button:'middle'})

    // mouse left click
    //await page.getByRole('link',{name:'Testers Talk'}).first().click({button:'left'})

    // mouse hover
    await page.locator("[aria-label='Search by voice']").hover()

    await page.waitForTimeout(5000)
  })
})
