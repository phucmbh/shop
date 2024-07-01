import { AuthResponse } from "@/@types/auth"
import http from "./http"

export const apiRegister = (body: { email: string; password: string }) => http.post<AuthResponse>("/register", body)

export const apiLogin = (body: { email: string; password: string }) => http.post<AuthResponse>("/login", body)
