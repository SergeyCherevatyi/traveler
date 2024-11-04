import { clientFetch } from '@/api/clientFetch.js'
import { router } from '@/router/index.js'

export const TOKEN_KEY = 'token'

class AuthService {
  #token = null

  isLoggedIn() {
    return Boolean(this.#token)
  }

  getToken() {
    return this.#token
  }

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
    this.#token = token
  }

  clearToken() {

    localStorage.removeItem(TOKEN_KEY)

    this.#token = null
  }

  async login(body) {
    const { data } = await clientFetch.post('/user/login', body)
    const { accessToken } = data

    this.setToken(accessToken)
  }

  async registerUser(body) {
    const { data } = await clientFetch.post('/user/register', body)
    const { accessToken } = data

    this.setToken(accessToken)
  }
  async logout() {
    await clientFetch.get('/user/logout')
    this.clearToken()
  }
  async refresh() {
    const { data } = await clientFetch.get('/user/refresh')

    const { accessToken } = data

    this.setToken(accessToken)
  }



}

export const authService = new AuthService()

// INTERCEPTOR FOR AUTHORIZATION
clientFetch.interceptors.request.use((request) => {
  const token = authService.getToken()
  if (token) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${token}`
    }
  }

  return request
})

// INTERCEPTOR FOR REFRESH TOKEN
clientFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorCode = error.response?.status

    if (errorCode === 401) {
      try {
        return await authService.refresh()
      } catch (e) {
        await router.push('/auth/login')
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  }
)
