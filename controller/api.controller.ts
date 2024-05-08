import { APIRequestContext, request } from 'playwright/test'

class APIController {
  private fakerApi: APIRequestContext

  async init() {
    this.fakerApi = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com/'
    })
  }

  async getUsers() {
    const response = await this.fakerApi.get('users')
    const responseBody = await response.json()
    return responseBody[0]
  }

  async createUser(title: string, completionStatus: Boolean) {
    const postResponse = await this.fakerApi.post('/users/1/todos', {
      data: {
        title: title,
        completed: completionStatus
      }
    })
    return await postResponse.json()
  }
}

export default new APIController()
