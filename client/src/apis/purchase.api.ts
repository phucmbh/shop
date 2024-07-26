import { SuccessResponse } from '@/@types'
import http from './http'
import { Purchase, PurchaseListStatus } from '@/@types/purchase.type'
import { URL } from '@/constants'

export const ApiPurchase = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL.PURCHASES}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL.PURCHASES}`, {
      params
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL.PURCHASES}/buy-products`, body)
  },
  updatePurchases(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL.PURCHASES}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL.PURCHASES}`, {
      data: purchaseIds
    })
  }
}
