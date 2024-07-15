import http from './http'
import { Product, ProductList, ProductListConfig, SuccessResponse } from '@/@types'

const URL = 'products'
export const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}
