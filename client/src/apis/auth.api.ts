import { AuthResponse } from '@/@types/auth'
import http from './http'
import { PATH } from '@/constants'

export const ApiAuth = {
  register: (body: { email: string; password: string }) => http.post<AuthResponse>(PATH.REGISTER, body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>(PATH.LOGIN, body),
  logout: () => http.post(PATH.LOGOUT)
}
