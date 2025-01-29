import { expect, test } from '@playwright/test'

test('Automate Speed Typewriting', async ({ page }) => {
  // Marking this test case as slow to increase its timeout
  test.slow()
  await page.goto('https://typing-speed-test.aoeu.eu/')
  // Waiting for the input area to appear on the page
  await page.waitForSelector('#input')

  // Counting the total number of words present on the page
  const totalWords = (await page.$$('.nextword')).length
  console.log(`Total words: ${totalWords}`)

  // Iterating through each word on the page
  for (let i = 0; i <= totalWords; i++) {
    // Finding the current word element on the page
    const wordElement = await page.locator('#currentword')
    // Extracting the text of the current word
    const word = await wordElement.innerText()

    // Typing the current word into the input area and pressing Space
    await page.fill('#input', word)
    await page.keyboard.press('Space')
    // Logging the word that was typed
    console.log(`Typed word ${i + 1}: ${word}`)
  }
  // Finding the final message element which contains the test result
  const finalMessage = await page.locator('#result')

  // Verifying that the final message contains the expected format of the test result
  await expect(finalMessage).toContainText(
    /Your score: \d+ CPM \(that is \d+ WPM\)/
  )
  // Verifying that the final message is visible on the page
  await finalMessage.isVisible()
})
