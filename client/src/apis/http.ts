import { AuthResponse, ErrorResponse, RefreshTokenReponse } from '@/@types'
import { PATH, URL } from '@/constants'
import LocalStorage from '@/utils/auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/util'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = LocalStorage.getAccessToken()
    this.refreshToken = LocalStorage.getRefreshToken()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày`
        'expire-refresh-token': 60 * 60 * 24 * 10 // 10 ngày
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

        if (url === PATH.LOGIN || url === PATH.REGISTER) {
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          LocalStorage.setAccessToken(data.data.access_token)
          LocalStorage.setRefreshToken(data.data.refresh_token)
          LocalStorage.setProfile(data.data.user)
        }

        if (url === PATH.LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          LocalStorage.clear()
        }

        return response
      },
      (error) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
            error.response?.status as HttpStatusCode
          )
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || {}
          const { url } = config
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL.REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            console.log(this.refreshTokenRequest)
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          LocalStorage.clear()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL.REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        LocalStorage.setAccessToken(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        LocalStorage.clear()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
