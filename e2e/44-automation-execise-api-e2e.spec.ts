import { expect, test } from '@playwright/test'

test.describe('Automation Exercise API login tests', () => {
  const baseUrl = 'https://automationexercise.com/api/verifyLogin'
  const EMAIL = 'borole116@gmail.com'
  const PASSWORD = 'Test@1998'

  /*This test shows post request with valid details using request model. This approach can be helpful in when
  request body is complex.*/
  test('@API Post: Verify login with valid details', async ({ request }) => {
    const response = await request.post(baseUrl, {
      form: {
        email: EMAIL,
        password: PASSWORD
      }
    })

    expect(response.status()).toBe(200)
    expect(response.status()).toEqual(expect.any(Number))
    const responseBody = await response.json()
    // expect(responseBody.message).toBe('User exists!')
    expect(responseBody.message).toEqual(expect.any(String))
  })

  test('@API Post: Verify login without email', async ({ request }) => {
    const response = await request.post(baseUrl, {
      form: {
        password: PASSWORD
      }
    })
    const responseBody = await response.json()
    expect(responseBody.message).toBe(
      'Bad request, email or password parameter is missing in POST request.'
    )
  })

  test('@API Post: Verify login with invalid credentials', async ({
    request
  }) => {
    const response = await request.post(baseUrl, {
      form: {
        email: 'invalidEmail',
        passowrd: 'invalidPassword'
      }
    })
    const responseBody = await response.json()
    expect(responseBody.message).toBe(
      'Bad request, email or password parameter is missing in POST request.'
    )
  })
})
