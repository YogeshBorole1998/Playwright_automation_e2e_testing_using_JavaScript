import { expect, request, test } from '@playwright/test'

test.describe('Restful Booker Update Booking Partially API Validation', () => {
  const baseURL = 'https://restful-booker.herokuapp.com'
  const bookingData = {
    firstname: 'Sally',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2013-02-23',
      checkout: '2014-10-23'
    },
    additionalneeds: 'Breakfast'
  }
  let bookingId: number

  async function generateToken() {
    const url = 'https://restful-booker.herokuapp.com/auth'

    const requestContext = await request.newContext()
    const response = await requestContext.post(url, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    })

    if (response.status() !== 200) {
      throw new Error(`Failed to fetch token: ${response.status()}`)
    }

    const body = await response.json()
    return body.token
  }

  test.beforeEach('Create Booking', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData
    })
    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    bookingId = responseBody.bookingid
  })

  test('@API Update Booking Partially - Update firstname and lastname - Patch', async ({
    request
  }) => {
    let ID = bookingId
    const url = `${baseURL}/booking/`
    const response2 = await request.get(url + ID, {})
    expect(response2.status()).toBe(200)

    const response = await request.patch(url + ID, {
      headers: {
        Cookie: `token=${await generateToken()}`,
        Accept: 'application/json'
      },
      data: {
        firstname: 'James',
        lastname: 'Brown'
      }
    })
    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()
    const responseBody = await response.json()

    console.log(responseBody)
    expect(responseBody).toHaveProperty('firstname', 'James')
    expect(responseBody).toHaveProperty('lastname', 'Brown')
    expect(responseBody).toHaveProperty('totalprice', bookingData.totalprice)
    expect(responseBody).toHaveProperty('depositpaid', bookingData.depositpaid)
    expect(responseBody).toHaveProperty(
      'additionalneeds',
      bookingData.additionalneeds
    )
  })
})
