import { APIRequestContext } from '@playwright/test'

/**
 * ApiClient — helper for making API calls directly in tests.
 * Use this to create or clean up test data via API instead of the UI.
 *
 * HOW TO USE:
 * const api = new ApiClient(request, process.env.BASE_URL!)
 * const data = await api.get('/api/users')
 */
export class ApiClient {

  constructor(
    private request: APIRequestContext,
    private baseUrl: string
  ) {}

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, {
      headers
    })
    return response.json()
  }

  async post<T>(
    endpoint: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data: body,
      headers
    })
    return response.json()
  }

  async put<T>(
    endpoint: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data: body,
      headers
    })
    return response.json()
  }

  async delete(endpoint: string, headers?: Record<string, string>): Promise<void> {
    await this.request.delete(`${this.baseUrl}${endpoint}`, { headers })
  }

  // ── Add your app-specific methods here ───────────────────────────────
  //
  // Example:
  // async createUser(data: CreateUserDto): Promise<User> {
  //   return this.post<User>('/api/users', data, {
  //     Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
  //   })
  // }
}
