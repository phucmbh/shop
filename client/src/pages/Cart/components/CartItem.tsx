import { memo, useEffect, useState } from 'react'
import { formatCurrency } from '@/utils/util'
import { QuantityController } from '@/components'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { purchaseApi } from '@/apis'
import { useDebounce } from '@/hook'
import { PURCHASES_STATUS } from '@/constants'
import { toast } from 'react-toastify'
import { ExtendedPurchase } from '@/@types'

interface Props {
  index: number
  purchase: ExtendedPurchase
  setPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const CartItem = memo(({ purchase, setPurchases, index }: Props) => {
  const [buyCount, setBuyCount] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const handleCheck = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchases(
      produce((draft) => {
        draft[index].checked = event.target.checked
      })
    )
  }

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchases
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }] })
      toast.success(data.data.message)
    }
  })

  const buyCountDebounce = useDebounce({ value: Number(buyCount), milliseconds: 1500 })

  useEffect(() => {
    if (buyCountDebounce) {
      updatePurchaseMutation.mutate(
        {
          product_id: purchase.product._id,
          buy_count: buyCountDebounce
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }] })
          }
        }
      )
    }
  }, [buyCountDebounce])

  const handleQuantity = (value: number, enable: boolean) => {
    if (enable) {
      setBuyCount(value)
    }
  }

  const handleTypeQuantity = () => (value: number) => {
    setPurchases(
      produce((draft) => {
        draft[index].buy_count = value
      })
    )

    setBuyCount(value)
  }

  const handleDeletePurchase = () => {
    const purchaseId = purchase._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  return (
    <div
      key={purchase._id}
      className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0"
    >
      <div className="col-span-6">
        <div className="flex">
          <div className="flex shrink-0 items-center justify-center pr-3">
            <input
              type="checkbox"
              className="accent-orange size-5"
              checked={purchase.checked}
              onChange={handleCheck()}
            />
          </div>
          <div className="grow">
            <div className="flex">
              <Link to={''} className="size-20 shrink-0">
                <img alt={purchase.product.name} src={purchase.product.image} />
              </Link>
              <div className="grow px-2 pb-2 pt-1">
                <Link to={''} className="line-clamp-2 text-left">
                  {purchase.product.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6">
        <div className="grid grid-cols-5 items-center">
          <div className="col-span-2">
            <div className="flex items-center justify-center">
              <span className="text-gray-300 line-through">
                ₫{formatCurrency(purchase.product.price_before_discount)}
              </span>
              <span className="ml-3">₫{formatCurrency(purchase.product.price)}</span>
            </div>
          </div>
          <div className="col-span-1">
            <QuantityController
              max={purchase.product.quantity}
              value={buyCount || purchase.buy_count}
              classNameWrapper="flex items-center"
              onIncrease={(value) =>
                handleQuantity(value, value <= purchase.product.quantity && value !== purchase.buy_count)
              }
              onDecrease={(value) => handleQuantity(value, value >= 1 && value !== purchase.buy_count)}
              onTypeValue={handleTypeQuantity()}
              disabled={purchase.disable}
            />
          </div>
          <div className="col-span-1">
            <span className="text-orange">
              ₫{formatCurrency(purchase.product.price * (buyCount || purchase.buy_count))}
            </span>
          </div>
          <div className="col-span-1">
            <button className="hover:text-orange bg-none text-black transition-colors" onClick={handleDeletePurchase}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
export default CartItem
