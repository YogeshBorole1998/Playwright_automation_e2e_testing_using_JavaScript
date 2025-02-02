import { test, expect, Page } from '@playwright/test'

test.describe('ICC Cricket Website Automation Testing', () => {
  test.beforeEach(async ({ page }) => {
    await goto(page)
  })

  test('verify the url and the logo visibility', async ({ page }) => {
    // Assert url contains 'cricket'
    await expect(page).toHaveURL(/.*cricket/)
    await verifyUrlContains(page, 'cricket')
    // Assert logo is visible
    await expect(page.locator("img[alt='Header Logo']")).toBeVisible()
  })

  test('search and verify new url & heading', async ({ page }) => {
    // Search for a country, example-'India'
    await performSearch(page, 'India')

    // Assert page url contains - search?term=India
    await verifyUrlContains(page, 'search?q=India')
  })

  test('verify menu tabs text and links', async ({ page }) => {
    const menuTabs = [
      'OVERVIEW',
      'CRICKET WORLD CUP',
      'BREAKING NEWS',
      'WORLD TEST CHAMPIONSHIP',
      'ENGLAND NEWS',
      'AFRICA NEWS'
    ]

    await page
      .locator(
        "div[class='group relative nav-item-wrapper h-full inline-flex hidden lg:block false'] a[aria-label='News']"
      )
      .click()

    const menuItems = page.locator('.tab-container > a') // 6 nodes
    // Assert the text of all the menu tabs
    console.log(await menuItems.allInnerTexts())
    expect(await menuItems.allInnerTexts()).toEqual(menuTabs)

    // Assert the text and the link for each menu tabs
    const expectedTabTextLinks = [
      {
        text: 'overview',
        href: '/tournaments/cricketworldcup/news/'
      },
      {
        text: 'Cricket world cup',
        href: '/tournaments/cricketworldcup/news/category/cricket-world-cup'
      },
      {
        text: 'breaking news',
        href: '/tournaments/cricketworldcup/news/category/breaking-news'
      },
      {
        text: 'World Test Championship',
        href: '/tournaments/cricketworldcup/news/category/world-test-championship'
      },
      {
        text: 'England news',
        href: '/tournaments/cricketworldcup/news/category/england-news'
      },
      {
        text: 'Africa news',
        href: '/tournaments/cricketworldcup/news/category/india-news'
      }
    ]

    for (const [index, tabItem] of expectedTabTextLinks.entries()) {
      // .tab-container > a:nth-child(3)
      const link = menuItems.nth(index)

      await expect(link).toHaveText(tabItem.text)
      await expect(link).toHaveAttribute('href', tabItem.href)
    }
  })

  test('verify table is divided into two sections with correct number of rows', async ({
    page
  }) => {
    await page.click(
      "div[class='group relative nav-item-wrapper h-full inline-flex hidden lg:block false'] a[aria-label='Standings']"
    )

    //  Assert the total number of rows in the table
    const totalRows = page.locator('.w-full tbody tr')
    await expect(totalRows).toHaveCount(10)

    // Assert the css property of the elements 1px solid hsl(var(--hsl-pure-black)/0.1)
    await expect(totalRows.nth(3)).toHaveCSS(
      'border-bottom',
      '1px dotted rgb(50, 0, 115)'
    )
  })

  async function goto(page: Page) {
    await page.goto('https://www.icc-cricket.com/tournaments/cricketworldcup', {
      timeout: 50000
    })
  }

  async function performSearch(page: Page, term: string) {
    await page.getByAltText('Search').click()
    const searchInput = await page.waitForSelector(
      'input[placeholder="what are you looking for?"]'
    )
    await searchInput.type(term)
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
  }

  async function verifyUrlContains(page: Page, text: string) {
    expect(page.url()).toContain(text)
  }
})
