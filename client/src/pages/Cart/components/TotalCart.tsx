import { Button } from '@/components'
import { purchaseApi } from '@/apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { PURCHASES_STATUS } from '@/constants'
import { formatCurrency } from '@/utils/util'
import clsx from 'clsx'
import { ExtendedPurchase } from '@/@types'
import { useMemo } from 'react'

interface Props {
  purchases: ExtendedPurchase[]
  setPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const TotalCart = ({ purchases, setPurchases }: Props) => {

  const isAllChecked = purchases.length > 0 ? purchases.every((purchase) => purchase.checked) : false
  const queryClient = useQueryClient()
  const handleCheckeAll = () => {
    setPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const checkedPurchases = useMemo(() => purchases.filter((purchase) => purchase.checked), [purchases])

  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }] })
      toast.success(data.data.message)
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }] })
      toast.success(data.data.message)
    }
  })

  const handleDeletePurchases = () => {
    const purhasesId = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purhasesId)
  }

  const handleBuyProducts = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  console.log('cart total')
  return (
    <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow md:flex-row md:items-start  md:gap-4">
      <div className="flex items-center">
        <div className="flex shrink-0 items-center justify-center pr-3">
          <input type="checkbox" className="accent-orange size-5" checked={isAllChecked} onChange={handleCheckeAll} />
        </div>
        <button className="mx-3 border-none bg-none">Chọn tất cả ({purchases.length})</button>
        <button className="hover:text-orange mx-3 border-none bg-none" onClick={handleDeletePurchases}>
          Xóa
        </button>
      </div>

      <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center sm:justify-end">
            <div>Tổng thanh toán ({checkedPurchases.length} sản phẩm):</div>
            <div className="text-orange ml-2 text-2xl">₫ {formatCurrency(totalCheckedPurchasePrice)}</div>
          </div>
          <div className="flex items-center text-sm sm:justify-end">
            <div className="text-gray-500">Tiết kiệm</div>
            <div className="text-orange ml-6">₫ {formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
          </div>
        </div>
        <Button
          className={clsx(
            'mt-5 flex h-10 w-52 items-center justify-center  text-sm uppercase text-white  sm:ml-4 sm:mt-0',
            {
              'bg-red-500 hover:bg-red-600': checkedPurchases.length > 0,
              'bg-red-400 hover:bg-red-500 cursor-not-allowed': checkedPurchases.length === 0
            }
          )}
          onClick={handleBuyProducts}
          disabled={buyProductsMutation.isPending}
        >
          Mua hàng
        </Button>
      </div>
    </div>
  )
}
export default TotalCart
