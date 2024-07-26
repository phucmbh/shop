import { AuthResponse } from '@/@types'
import http from './http'
import { URL } from '@/constants'

export const ApiAuth = {
  register: (body: { email: string; password: string }) => http.post<AuthResponse>(URL.REGISTER, body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>(URL.LOGIN, body),
  logout: () => http.post(URL.LOGOUT)
}
