import { URL } from '@/constants'
import http from './http'
import { Product, ProductList, ProductListConfig, SuccessResponse } from '@/@types'

export const ApiProduct = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL.PRODUCTS, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL.PRODUCTS}/${id}`)
  }
}
