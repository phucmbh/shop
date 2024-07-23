import { SuccessResponse, User } from '@/@types'
import http from './http'

type Body = {
  name?: string
  date_of_birth?: string
  address?: string
  phone?: string
  avatar?: string
  password?: string
  newPassword?: string
}

export const ApiUser = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: Body) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
