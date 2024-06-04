import { expect, test } from '@playwright/test'

test.describe('Restful Booker Create Booking API Validation', () => {
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

  test('@API Create Booking', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData
    })

    const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()
    expect(responseBody.bookingid).toBeTruthy()
    expect(responseBody.booking).toHaveProperty(
      'firstname',
      bookingData.firstname
    )
    expect(responseBody.booking).toHaveProperty(
      'lastname',
      bookingData.lastname
    )
    expect(responseBody.booking).toHaveProperty(
      'totalprice',
      bookingData.totalprice
    )
    expect(responseBody.booking).toHaveProperty(
      'depositpaid',
      bookingData.depositpaid
    )
    expect(responseBody.booking).toHaveProperty(
      'additionalneeds',
      bookingData.additionalneeds
    )
  })

  test('@API Smoke Testing - Service HealthCheck', async ({ request }) => {
    const response = await request.get(`${baseURL}/ping`)
    expect(response.status()).toBe(201)
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe('Created')
  })
})
