import { ErrorResponse } from '@/@types'
import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

/**
 * Check 422 error
 */
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

/**
 * Check 401 error
 */
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-De').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const percentDiscount = (price_before_discount: number, price: number) =>
  Math.round(((price_before_discount - price) / price_before_discount) * 100) + '%'

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

const KEY_WORD = '-i.'

export const genarateSlugify = ({ name, id }: { name: string; id: string }) => {
  return (
    removeSpecialCharacter(name)
      .trim()
      .replace(/\s/g, '-') // remove consecutive hyphens
      .replace(/-+/g, '-') + `${KEY_WORD + id}`
  )
}

export const getIdFromSlugify = (slugify: string) => {
  const arr = slugify.split(KEY_WORD)
  return arr[arr.length - 1]
}

export const getUrlAvatar = (name?: string) => {
  return name ? 'https://api-ecom.duthanhduoc.com/images/' + name : 'https://placehold.co/400'
}
