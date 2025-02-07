import { test } from '@playwright/test'

test('basic performance layout shift', async ({ page }) => {
    await page.goto('https://danube-web.shop/')

    const cummulativeLayoutShift: number = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
            let CLS = 0;
            let timeout: NodeJS.Timeout;

            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        CLS += entry.value;
                    }
                }

                // Clear previous timeout and set a new one
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    observer.disconnect();
                    resolve(CLS);
                }, 3000); // Resolves after 3 seconds of no new layout shifts
            });

            observer.observe({ type: 'layout-shift', buffered: true });

            // Ensure it resolves eventually in case of no layout shifts
            setTimeout(() => {
                observer.disconnect();
                resolve(CLS);
            }, 5000); // 5 seconds max wait
        });
    });

    console.log(parseFloat(cummulativeLayoutShift.toFixed(6))); // Example: 0.000167
});
