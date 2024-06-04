import { expect, test } from '@playwright/test'

test.describe('Restful Booker Get Booking Ids API Validation', () => {
  let number: number
  let sys_id: string
  const shortDescription: string = 'required ms office 365'

  test.skip('Create an Incident', async ({ request }) => {
    const response = await request.post(
      'https://dev95993.service-now.com/api/now/table/incident',
      {
        data: {
          // body info from endpoint goes here
          short_description: shortDescription,
          category: 'hardware'
        }
        // This has to be added to get it returned as an xml rather than json
        // headers: {
        //   'Accept': 'application/xml'
        // }
      }
    )
    // verification
    // expect(response.status()).toBe(201)
    expect(response.ok()).toBeTruthy()
    // this will print the entire body in the terminal along with test results
    console.log(await response.json())
    // assigns the incident number to a var so we can use it in our GET request
    const res = await response.json()
    number = res.result.task_effective_number // t.e.n. is what incident number is called in the api results
    sys_id = res.result.sys_id
    // output as xml - both json and xml are supported. Added headers after adding this next line
    // console.log(await (await response.body()).toString());
  })
})
