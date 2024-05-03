import { test, expect, request } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'

  test('@API assert response status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
  })

  test('@API assert invalid endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)

    expect(response.status()).toBe(404)
  })

  test('@API Get Request - get user details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.email).toBe('george.bluth@reqres.in')
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
  })

  test('@API Post Request - create new user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: {
        id: 46171542,
        name: 'Yogesh Borole',
        job: 'Software Engineer'
      }
    })
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)

    expect(responseBody.id).toBe(46171542)
    expect(responseBody.createdAt).toBeTruthy()
  })

  test('@API Post Request - login successful', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    })
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
  })

  test('@API Post Request - login fail', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'peter@klaven'
      }
    })
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })

  test('@API Put Request - update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'Sama Dharma',
        job: 'Angular Developer'
      }
    })
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('Sama Dharma')
    expect(responseBody.job).toBe('Angular Developer')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('@API Delete Request - delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    expect(response.status()).toBe(204)
  })
})
