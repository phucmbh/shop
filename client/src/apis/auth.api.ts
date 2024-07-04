import { AuthResponse } from '@/@types/auth'
import http from './http'
import path from '@/constants/path'

export const apiRegister = (body: { email: string; password: string }) => http.post<AuthResponse>(path.REGISTER, body)

export const apiLogin = (body: { email: string; password: string }) => http.post<AuthResponse>(path.LOGIN, body)

export const apiLogout = () => http.post(path.LOGOUT)
