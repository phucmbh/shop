import http from './http'
import { SuccessResponse } from '@/@types'
import { Category } from '@/@types/category.type'
const URL = 'categories'

export const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}