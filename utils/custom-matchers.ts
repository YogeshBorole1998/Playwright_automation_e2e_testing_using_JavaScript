import { expect, Locator, Page } from '@playwright/test';

export const customMatchers = {
    async toBeVisibleWithMessage(locator: Locator, message: string) {
        const isVisible = await locator.isVisible();
        return {
            pass: isVisible,
            message: () =>
                isVisible
                    ? `✅ ${message} - Element is visible`
                    : `❌ ${message} - Element is NOT visible`,
        };
    },

    async toHaveURLContaining(page: Page, expectedSubstring: string) {
        const currentURL = page.url();
        const pass = currentURL.includes(expectedSubstring);
        return {
            pass,
            message: () =>
                pass
                    ? `✅ URL contains "${expectedSubstring}"`
                    : `❌ Expected URL to contain "${expectedSubstring}", but got "${currentURL}"`,
        };
    },
};

