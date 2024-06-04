import { expect, test } from '@playwright/test'
import {
  expectedGoRestUrl,
  expectedStatusRestext,
  expectedSuccessStatusCode
} from '../controller/api-constants'

test.describe('GoRest API Validation', () => {
  test('@API Validate response status and content', async ({ request }) => {
    const response = await request.get('https://gorest.co.in/public/v2/users')
    const statusCode = response.status()
    const statusRestext = response.statusText()
    const responseBody = await response.body()
    const jsonData = await response.json()
    const isOk = response.ok()
    const text = await response.text()
    const url = response.url()
    const responseHeaders = response.headers()

    console.log('response status code: ' + statusCode) // 200
    console.log('status response text: ' + statusRestext) // 'OK'
    console.log('response body: ' + responseBody)
    console.log('JSON Data:', jsonData)
    console.log('Is response ok?:', isOk) // true
    console.log('Text:', text)
    console.log('URL:', url) // https://gorest.co.in/public/v2/users

    expect(statusCode).toBe(expectedSuccessStatusCode)
    expect(statusRestext).toBe(expectedStatusRestext)
    expect(url).toBe(expectedGoRestUrl)
    expect(isOk).toBe(true)
    expect(responseHeaders['content-type']).toBe(
      'application/json; charset=utf-8'
    )

    // response.dispose() is dispose only response body but status code, url, status text will remain same.
    await response.dispose()
    try {
      console.log(
        'API response after dispose with plain text:',
        await response.text()
      )
    } catch (error) {
      console.log('api response body is disposed..!!')
    }

    console.log('response status code after dispose: ' + response.status()) // 200
  })
})
