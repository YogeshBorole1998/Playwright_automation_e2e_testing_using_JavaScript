import { expect, request, test } from '@playwright/test'

test.describe('Practice expand testing API login tests', () => {
  const apiURL = 'https://practice.expandtesting.com/notes/api'
  const envEmail = 'hananurrehman@gmail.com' ?? ''
  const envPassword = '123456' ?? ''
  const email = 'hananurrehman@gmail.com'
  const name = 'Hanan Test'
  let authToken: string

  async function loginAPI(email?: string, password?: string) {
    const context = await request.newContext()
    email = email || envEmail
    password = password || envPassword

    const response = await context.post(apiURL + `/users/login`, {
      data: {
        email: email,
        password: password
      }
    })
    return response
  }

  async function generateAuthToken() {
    const response = await loginAPI()
    const responseBody = JSON.parse(await response.text())
    authToken = responseBody.data.token
  }

  async function addNoteAPI(
    title: string,
    description: string,
    category: string
  ) {
    const context = await request.newContext()
    await generateAuthToken()
    const response = await context.post(apiURL + `/notes`, {
      data: {
        title: title,
        description: description,
        category: category
      },
      headers: {
        'x-auth-token': authToken
      }
    })
    return response
  }

  test('@API Check login successful', async () => {
    const response = await loginAPI()
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.status).toBe(200)
    expect(responseBody.data.name).toBe(name)
    expect(responseBody.data.email).toBe(email)
    expect(responseBody.data.token).toBeDefined()
  })

  test('@API Check login unsuccessful', async () => {
    const response = await loginAPI('', 'password')
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.status).toBe(401)
    expect(responseBody.message).toBe('Incorrect email address or password')
  })

  test('@API Check password length', async () => {
    const response = await loginAPI('', 'Lorem ipsum dolor sit amet, con')
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.status).toBe(400)
    expect(responseBody.message).toBe(
      'Password must be between 6 and 30 characters'
    )
  })

  test('@API Check email format', async () => {
    const response = await loginAPI('hanan@test', '')
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.status).toBe(400)
    expect(responseBody.message).toBe('A valid email address is required')
  })

  test('Create note', async () => {
    const response = await addNoteAPI(
      'Test note',
      'Test note from Playwright',
      'Home'
    )
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.status).toBe(200)
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe('Test note')
  })
})
