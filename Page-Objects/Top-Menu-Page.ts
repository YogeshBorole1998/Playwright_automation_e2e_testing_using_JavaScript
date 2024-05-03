import { expect, Locator, Page } from '@playwright/test'

export class TopMenuPage {
  readonly page: Page
  readonly getStartedLink: Locator
  readonly nodeLink: Locator
  readonly javaLink: Locator
  readonly nodeLabel: Locator
  readonly javaLabel: Locator
  readonly nodeDescription: string = 'Installing Playwright'
  readonly javaDescription: string = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`

  constructor(page: Page) {
    this.page = page
    this.getStartedLink = page.getByRole('link', { name: 'Get started' })
    this.nodeLink = page.getByRole('button', { name: 'Node.js' })
    this.javaLink = page
      .getByRole('navigation', { name: 'Main' })
      .getByText('Java')
    this.nodeLabel = page.getByText(this.nodeDescription, { exact: true })
    this.javaLabel = page.getByText(this.javaDescription)
  }

  async hoverNode(): Promise<void> {
    await this.nodeLink.hover()
  }

  async clickJava(): Promise<void> {
    await this.javaLink.click()
  }

  async assertPageUrl(pageUrl: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pageUrl)
  }

  async assertNodeDescriptionNotVisible(): Promise<void> {
    await expect(this.nodeLabel).not.toBeVisible()
  }

  async assertJavaDescriptionVisible(): Promise<void> {
    await expect(this.javaLabel).toBeVisible()
  }
}
export default TopMenuPage
