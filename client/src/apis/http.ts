import { User } from '@/@types'
import { AuthResponse } from '@/@types/auth'
import path from '@/constants/path'
import LocalStorage from '@/utils/auth'
// import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from "@/utils/auth"
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private profile: User
  constructor() {
    this.accessToken = LocalStorage.getAccessToken()
    this.profile = LocalStorage.getProfile()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
          return config
        }

        return config
      },
      function (error: AxiosError) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const data: AuthResponse = response.data

        if (url === path.LOGIN || url === path.REGISTER) {
          this.accessToken = data.data.access_token // accessToken use in header request
          LocalStorage.setAccessToken(data.data.access_token)
          LocalStorage.setProfile(data.data.user)
        }

        if (url === path.LOGOUT) {
          this.accessToken = ''
          LocalStorage.clear()
        }

        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          console.log(error)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          console.log(message)
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http