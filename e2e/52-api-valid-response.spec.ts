import { test, expect } from '@playwright/test'

test('@API API call has a valid response', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/todos')

  await expect(response).toBeOK()
  const body = await response.json()

  expect(body.todos[0].id).toBe(1)
  expect(body.todos[0].userId).toEqual(expect.any(Number))
  expect(body.todos[0].todo).toEqual(expect.any(String))
  expect(body.todos[0].completed).toEqual(expect.any(Boolean))
  expect(body.todos).toEqual(expect.any(Array))

  // expect.any() is like a mini type checker that checks if a value was created with a particular constructor.
  // Make that bit Nicer :
  expect(body.todos[0]).toMatchObject({
    id: expect.any(Number),
    todo: expect.any(String),
    completed: expect.any(Boolean),
    userId: expect.any(Number)
  })
})
