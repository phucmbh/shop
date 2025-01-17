import { Product } from '@/@types'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputQuantity, Rating } from '@/components'
import { formatCurrency, formatNumberToSocialStyle, percentDiscount } from '@/utils/util'
import { FaCartPlus, FaShippingFast, IoShieldCheckmarkSharp } from '@/utils/icons'
import { useState } from 'react'

import { ApiPurchase } from '@/apis'
import { PATH, PURCHASES_STATUS } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {
  product: Product
}

const ProductInformation = ({ product }: Props) => {
  const { t } = useTranslation(['product'])
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleQuantity = (value: number) => {
    setQuantity(value)
  }

  const addToCartMutation = useMutation({
    mutationFn: ApiPurchase.addToCart
  })

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: product._id, buy_count: quantity },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }] })
          toast.success(data.data.message)
        }
      }
    )
  }

  const handleBuyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product._id, buy_count: quantity })
    const purchase = res.data.data
    navigate(PATH.CART, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  return (
    <div className=" flex flex-col gap-5">
      <h1 className="line-clamp-2 text-xl font-medium uppercase">{product.name}</h1>
      <div className="flex">
        <div className="flex">
          <span className="mr-1 border-b border-orange text-orange">{product.rating.toFixed(1)}</span>

          <Rating rating={product.rating} activeClassName="text-orange" />
        </div>
        <div className="mx-4 h-4 w-px bg-gray-300"></div>
        <div>
          <span className="mr-1 border-orange">{formatNumberToSocialStyle(product.sold)}</span>
          <span className="text-gray-400">{t('sold')}</span>
        </div>
      </div>
      <div className="flex items-center  gap-4 bg-gray-50 p-5">
        <span className="text-sm  text-gray-400 line-through">
          {`₫ ${formatCurrency(product.price_before_discount)}`}
        </span>
        <span className="text-2xl text-orange ">{`₫ ${formatCurrency(product.price)}`}</span>
        <span className="rounded-sm bg-orange px-1 py-px text-xs font-semibold uppercase text-white">
          {percentDiscount(product.price_before_discount, product.price)} {t('down')}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <p className="capitalize">{t('quantity')}</p>

        <InputQuantity
          classNameWrapper="ml-7"
          value={quantity}
          onTypeValue={handleQuantity}
          onIncrease={handleQuantity}
          onDecrease={handleQuantity}
          max={product.quantity}
        />

        {product.quantity && <p className="ml-5">{`${product.quantity} ${t('products available')}`}</p>}
      </div>
      <div className="flex gap-5">
        <button
          className="flex h-12 min-w-48 items-center justify-center gap-2 rounded-sm border border-orange bg-red-50 text-orange hover:bg-red-50/30"
          onClick={handleAddToCart}
        >
          <FaCartPlus size={20} />
          <p>{t('add to card')}</p>
        </button>

        <button onClick={handleBuyNow} className=" h-12 min-w-28 rounded-sm bg-orange text-white hover:bg-orange/90">
          <p>{t('buy now')}</p>
        </button>
      </div>
      <div className="my-4 h-px w-full bg-gray-100"></div>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <IoShieldCheckmarkSharp className="text-orange" /> <p>{t('genuine product')} 100%</p>
        </div>
        <div className="flex items-center gap-2 ">
          <FaShippingFast className="text-orange" /> <p>{t('free shipping')}</p>
        </div>
      </div>
    </div>
  )
}
export default ProductInformation
