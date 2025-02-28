const { test, expect } = require('@playwright/test')

//test.use({ browserName: 'webkit'});
test('@Web Browser Context-Validating Error login', async ({ browser }) => {
  const context = await browser.newContext() // Creates a new browser context. It won't share cookies/cache with other browser contexts.
  const page = await context.newPage() // Creates a new page in the browser context.
  // without writing above 2 lines we can also use page fixture - refer next (Web UI Controls) testcase

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/') // search particular url
  console.log(await page.title()) // To print the title of the webpage
  expect(await page.title()).toEqual(
    'LoginPage Practise | Rahul Shetty Academy'
  )
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')

  const userName = page.locator('#username') // Rel CSS Selector - id
  const signIn = page.locator('#signInBtn') // Rel CSS Selector - id
  await userName.fill('rahulshetty')
  await page.locator("[type='password']").fill('learning') // Based on any attribute i.e. [attribute='value']
  await signIn.click()

  console.log(await page.locator("[style*='block']").textContent()) // Incorrect username/password.
  await expect(page.locator("[style*='block']")).toContainText('Incorrect') // Verify Wrong Login Details.

  //type - fill
  await userName.fill('') // clear existing content inside username field
  await userName.fill('rahulshettyacademy') // give proper username
  await signIn.click()

  const cardTitles = page.locator('.card-body a') // Based on class attribute i.e. .class tagname as child

  console.log(await cardTitles.first().textContent()) // get first element means index 0 --> iphone X
  console.log(await cardTitles.nth(1).textContent()) // get second element means index 1 --> Samsung Note 8

  /* If we removed above 2 lines then below line will failed - means it will passed but not return elements, because of flekiness of testcase & synchronization means :
  - Playwright provides methods like textContent() and allTextContents() to fetch text content from elements. When you use these methods, Playwright waits until 
    the element is attached to the DOM before retrieving the text content.

  - For instance, if you use textContent() to get the text content of an element, Playwright waits until that element appears in the DOM before returning the text content.
    However, when you use allTextContents() to get text content from multiple elements, Playwright doesn't wait for the elements to appear. Instead, it immediately returns 
    an array of text content, even if the elements haven't loaded yet.

  - This difference in behavior can lead to unexpected results. For example, if you use allTextContents() without waiting for the elements to load, you might get an 
      array with zero elements, even though the page is still loading. In contrast, using textContent() ensures that Playwright waits for the element to appear before 
      retrieving the text content, providing more reliable results. 
     */

  const allTitles = await cardTitles.allTextContents()
  console.log(allTitles) // [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]

  // // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
  // page.on('request', request => console.log(request.url()));
  // page.on('response', response => console.log(response.url(), response.status()));
})

test('@Web UI Controls', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const documentLink = page.locator("[href*='documents-request']")
  const dropdown = page.locator('select.form-control')

  await dropdown.selectOption('consult')
  // await page.pause(); // Pause execution of the test to allow for manual inspection or debugging.

  await page.locator('.radiotextsty').last().click() // check user radio button
  await page.locator('#okayBtn').click() // click ok on popup or accept the popup
  console.log(await page.locator('.radiotextsty').last().isChecked()) // true
  await expect(page.locator('.radiotextsty').last()).toBeChecked()

  await page.locator('#terms').click() // Agree to the terms and conditions
  await expect(page.locator('#terms')).toBeChecked()
  await page.locator('#terms').uncheck() // uncheck to the terms and conditions
  await expect(page.locator('#terms')).not.toBeChecked()

  // check whether the link is blinking or not on UI
  await expect(documentLink).toHaveAttribute('class', 'blinkingText')
})

test('Child windows handling', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const documentLink = page.locator("[href*='documents-request']")

  /* If you give : await documentLink.click(); it will open in new window/page but our scope is only single page, 
     our page variable do not have any knowledge obout new page.

    So in that case Wait for a new page to open after clicking on the document link.
    This below code listens for the "page" event within the context and clicks on the document link.
    Once the link is clicked, the Promise resolves with the new page that opens.
  */

  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // The event is emitted when a new Page is created in the BrowserContext
    documentLink.click()
  ])

  const text = await newPage.locator('.red').textContent()
  console.log(text) // Please email us at mentor@rahulshettyacademy.com with below template to receive response
  const arrayText = text.split('@')
  console.log(arrayText) // [ 'Please email us at mentor', 'rahulshettyacademy.com with below template to receive response ' ]
  const domain = arrayText[1].split(' ')[0]
  console.log(domain) // rahulshettyacademy.com

  // Enter username inside our parent page means original page
  await page.locator('#username').fill(domain)
  // Retrieve the value typed into the input field with id "username"
  console.log(await page.locator('#username').inputValue()) // rahulshettyacademy.com
})

test('@Web Browser Context - Validating Login Functionality', async ({
  browser
}) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const userName = page.locator('#username')
  const signIn = page.locator('#signInBtn')

  /** This line of code intercepts network requests for image files with extensions .jpg, .png, and .jpeg using Playwright's page.route() method
   * and aborts these requests. This can be useful for excluding image requests from affecting the test execution or for testing scenarios where
   * image loading needs to be prevented.
   * */
  page.route('**/*.{jpg,png,jpeg}', (route) => route.abort())

  /**
   * To Print all the API calls URL & status
   */
  // Listening for all requests made by the page using the 'request' event
  page.on('request', (request) => {
    // Logging the URL of each request to the console
    console.log(request.url())
  })

  // Listening for all responses received by the page using the 'response' event
  page.on('response', (response) => {
    // Logging the URL and status code of each response to the console
    console.log(response.url(), response.status())
  })

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  await userName.fill('rahulshettyacademy')
  await page.locator("[type='password']").fill('learning')
  await signIn.click()
  // await page.pause();
})
