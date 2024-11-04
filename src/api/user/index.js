import { clientFetch } from '@/api/clientFetch.js'


export const login = (body) => {
  return  clientFetch.post('/user/login', body)
}

export const registerUser = (body) => {
  return clientFetch.post('/user/register', body)
}

export const logout = () => {
  return clientFetch.get('/user/logout')
}

export const refreshToken = () => {
  return clientFetch.get('/user/refresh')
}

export const getUserInfo = () => {
  return clientFetch.get('/user/me')
}
