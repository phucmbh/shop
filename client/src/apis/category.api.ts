import http from './http'
import { SuccessResponse } from '@/@types'
import { Category } from '@/@types/category.type'
import { URL } from '@/constants'

export const ApiCategory = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL.CATEGORIES)
  }
}
