import { test } from '@playwright/test'

test.describe('Test Details Reporting', () => {
  test('Display Test Information', async ({ page }, testInfo) => {
    // Displaying test name
    console.log(`Test Name: ${testInfo.title}`) // Display Test Information

    // Displaying parallel index
    console.log(`Parallel Index: ${testInfo.parallelIndex}`) // 0

    // Displaying shard index
    console.log(`Shard Index: ${JSON.stringify(testInfo.config.shard)}`) // null
  })
})
