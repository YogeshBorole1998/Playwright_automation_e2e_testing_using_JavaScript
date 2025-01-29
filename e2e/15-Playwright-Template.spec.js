import { test } from '@playwright/test'

//AAA Pattern

// [Arrange]
// [Act]
// [Assert]

// const password = process.env.PASSWORD

test.beforeAll(async () => {
  test.skip(
    !!process.env.PROD,
    'Test intentionally skipped in production due to data dependency.'
  )
  // start a server before all tests start to be run
  // create a db connection before all tests start to be run
  // reuse a sign in state before all tests start to be run
})

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  // open a URL before each test start to be run
  // clean up the DB before each test start to be run
  // create a page object before each test start to be run
  // dismiss a modal before each test start to be run
  // load params before each test start to be run
})

test.afterAll(async () => {
  console.log('Test file completed.')
  // close a DB connection after all test executions done.
})

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`)

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`)
  // clean up all the data we created for this test through API calls
})

// test.describe('Test Cases outline', () => {
// test.describe.only('Only this test case will run', () => {
test.describe.skip(
  'This testcases inside this block is not execute, alss cases will be skipped',
  () => {
    test('Scenario One', async () => {
      await test.step('Step One', async () => {
        // ...
      })

      await test.step('Step Two', async () => {
        // ...
      })

      // ...
    })

    test('Scenario Two', async () => {
      // Arrange
      // Act
      // Assert
    })
    /**
    test.only('Test Scenario Three', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */
    /**
    test.skip('Test Scenario Four', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */
  }
)
