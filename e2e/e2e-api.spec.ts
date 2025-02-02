import { test, expect, request } from '@playwright/test'

test.describe.parallel('API Testing & Validations - reqres.in', () => {
  const baseUrl = 'https://reqres.in/api'

  test('@API assert response status - single user', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)

    // const responseBody = JSON.parse(await response.text())
    const responseBody = await response.json()
    console.log(responseBody)

    const properties = ['id', 'first_name', 'last_name', 'email', 'avatar']
    properties.forEach((prop) => {
      expect(responseBody.data).toHaveProperty(prop)
    })

    // Validate specific fields
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.first_name).toBe('Janet')
    expect(responseBody.data.last_name).toBe('Weaver')
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in')
  })

  test('@API assert invalid endpoint - single user not found', async ({
    request
  }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)

    expect(response.status()).toBe(404)
  })

  test('@API Get Request - list users details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users?page=2`)
    // const responseBody = JSON.parse(await response.text())
    const responseBody = await response.json()
    const expectedData = {
      page: 2,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 7,
          email: 'michael.lawson@reqres.in',
          first_name: 'Michael',
          last_name: 'Lawson',
          avatar: 'https://reqres.in/img/faces/7-image.jpg'
        },
        {
          id: 8,
          email: 'lindsay.ferguson@reqres.in',
          first_name: 'Lindsay',
          last_name: 'Ferguson',
          avatar: 'https://reqres.in/img/faces/8-image.jpg'
        },
        {
          id: 9,
          email: 'tobias.funke@reqres.in',
          first_name: 'Tobias',
          last_name: 'Funke',
          avatar: 'https://reqres.in/img/faces/9-image.jpg'
        },
        {
          id: 10,
          email: 'byron.fields@reqres.in',
          first_name: 'Byron',
          last_name: 'Fields',
          avatar: 'https://reqres.in/img/faces/10-image.jpg'
        },
        {
          id: 11,
          email: 'george.edwards@reqres.in',
          first_name: 'George',
          last_name: 'Edwards',
          avatar: 'https://reqres.in/img/faces/11-image.jpg'
        },
        {
          id: 12,
          email: 'rachel.howell@reqres.in',
          first_name: 'Rachel',
          last_name: 'Howell',
          avatar: 'https://reqres.in/img/faces/12-image.jpg'
        }
      ],
      support: {
        url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
        text: 'Tired of writing endless social media content? Let Content Caddy generate it for you.'
      }
    }

    expect(response.status()).toBe(200)
    expect(responseBody.page).toBe(expectedData.page)
    expect(responseBody.per_page).toBe(expectedData.per_page)
    expect(responseBody.total).toBe(expectedData.total)
    expect(responseBody.total_pages).toBe(expectedData.total_pages)

    // Verify the user data
    for (let i = 0; i < expectedData.data.length; i++) {
      expect(responseBody.data[i].id).toBe(expectedData.data[i].id)
      expect(responseBody.data[i].email).toBe(expectedData.data[i].email)
      expect(responseBody.data[i].first_name).toBe(
        expectedData.data[i].first_name
      )
      expect(responseBody.data[i].last_name).toBe(
        expectedData.data[i].last_name
      )
      expect(responseBody.data[i].avatar).toBe(expectedData.data[i].avatar)
    }

    // Verify the support section
    expect(responseBody.support.url).toBe(expectedData.support.url)
    expect(responseBody.support.text).toBe(expectedData.support.text)
  })

  test('@API Get Request - get user details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody = JSON.parse(await response.text())
    // const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.email).toBe('george.bluth@reqres.in')
    expect(responseBody.data.email).toBeTruthy()
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
  })

  test('@API Get Request - delayed response', async ({ request }) => {
    // Record start time
    const startTime = new Date().getTime()

    // Perform a GET request with a delay
    const response = await request.get(`${baseUrl}/users?delay=4`)

    // Record end time
    const endTime = new Date().getTime()

    // Calculate elapsed time in seconds
    const elapsedTime = (endTime - startTime) / 1000

    // Print response details for debugging
    console.log('Response status code:', response.status()) // 200
    console.log('Elapsed time (seconds):', elapsedTime) // 4.519

    // Assert the delay time (with some tolerance)
    expect(elapsedTime).toBeGreaterThanOrEqual(4) // minimum delay
    expect(elapsedTime).toBeLessThanOrEqual(5) // allowing some network overhead

    expect(response.status()).toBe(200)
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

  test('@API Post Request - register successful', async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
  })

  test('@API Post Request - register fail', async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      data: {
        email: 'sydney@fife'
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
      },
      headers: { Accept: 'application/json' }
    })
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('Sama Dharma')
    expect(responseBody.job).toBe('Angular Developer')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('@API Patch Request - update user', async ({ request }) => {
    const response = await request.patch(`${baseUrl}/users/2`, {
      data: {
        name: 'Anjali P',
        job: 'UI Developer'
      }
    })
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('Anjali P')
    expect(responseBody.job).toBe('UI Developer')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('@API Delete Request - delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    expect(response.status()).toBe(204)
  })
})
