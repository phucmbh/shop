import { User } from './user'
import { ApiResponse } from './utils.type'

export type AuthResponse = ApiResponse<{
  access_token: string
  expires: string
  user: User
}>
