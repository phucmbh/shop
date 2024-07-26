import { User } from '@/@types'

export const LocalStorageEventTarget = new EventTarget()

const LocalStorage = {
  clear: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('profile')
    const clearEvent = new Event('clearLocalStorage')
    LocalStorageEventTarget.dispatchEvent(clearEvent)
  },

  setAccessToken: (access_token: string) => {
    localStorage.setItem('access_token', access_token)
  },

  getAccessToken: () => localStorage.getItem('access_token') || '',

  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem('refresh_token', refreshToken)
  },

  getRefreshToken: () => localStorage.getItem('refresh_token') || '',

  setProfile: (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile))
  },

  getProfile: () => {
    const result = localStorage.getItem('profile')
    return result ? JSON.parse(result) : null
  }
}

export default LocalStorage
