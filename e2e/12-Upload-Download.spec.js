const ExcelJS = require('exceljs')
const { test, expect } = require('@playwright/test')

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(filePath)
  const worksheet = workbook.getWorksheet('Sheet1')
  const output = await readExcel(worksheet, searchText)

  const cell = worksheet.getCell(output.row, output.column + change.colChange)
  cell.value = replaceText
  await workbook.xlsx.writeFile(filePath)
}

async function readExcel(worksheet, searchText) {
  const output = { row: -1, column: -1 }
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber
        output.column = colNumber
      }
    })
  })
  return output
}

test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Papaya'
  const updateValue = '890'
  await page.goto(
    'https://rahulshettyacademy.com/upload-download-test/index.html'
  )

  // Create a promise to wait for the download event
  const downloadPromise = page.waitForEvent('download')

  // Click on Download button to initiate the download of an xlsx file
  await page.getByRole('button', { name: 'Download' }).click()

  // Wait for the download to complete by resolving the download promise
  await downloadPromise

  //update Papaya Price to 890.
  writeExcelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    './download.xlsx'
  )

  // Click on Upload choose file button & upload file
  await page.locator('#fileinput').click()
  await page.locator('#fileinput').setInputFiles('./download.xlsx')

  // Find the locator for the text to search for, in this case, 'Papaya'
  const textlocator = page.getByText(textSearch)

  // Find the desired row containing the searched text
  const desiredRow = await page.getByRole('row').filter({ has: textlocator })

  // Expect the cell with id "cell-4-undefined" in the desired row to contain the updateValue
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(
    updateValue
  )
})
