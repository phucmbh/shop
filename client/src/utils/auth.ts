import { User } from '@/@types'

const LocalStorage = {
  clear: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
  },

  setAccessToken: (access_token: string) => {
    localStorage.setItem('access_token', access_token)
  },

  getAccessToken: () => localStorage.getItem('access_token') || '',

  setProfile: (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile))
  },

  getProfile: () => {
    const result = localStorage.getItem('profile')
    return result ? JSON.parse(result) : null
  }
}

export default LocalStorage
