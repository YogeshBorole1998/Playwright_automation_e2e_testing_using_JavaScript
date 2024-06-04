import { expect, test } from '@playwright/test'

test.describe('Restful Booker Get Booking Ids API Validation', () => {
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
  let bookingId: string

  test.beforeEach('Create Booking', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData
    })
    expect(response.status()).toBe(200)
    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    bookingId = responseBody.bookingid
  })

  test('@API Get Booking Ids', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking`)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

    let responseAsString = await response.body().then((b) => {
      let data = JSON.parse(b.toString())
      return data.filter(
        (d: { bookingid: string | undefined }) => d.bookingid == bookingId
      )
    })

    let ID = bookingId
    const a = ID
    if (a) {
      expect(responseAsString[0]).toHaveProperty('bookingid', +a)
    }
  })
})
