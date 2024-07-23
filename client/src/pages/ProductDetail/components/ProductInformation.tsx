import { Product } from '@/@types'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QuantityController, Rating } from '@/components'
import { formatCurrency, formatNumberToSocialStyle, percentDiscount } from '@/utils/util'
import { FaCartPlus, FaShippingFast, IoShieldCheckmarkSharp } from '@/utils/icons'
import { useState } from 'react'

import { purchaseApi } from '@/apis'
import { PATH, PURCHASES_STATUS } from '@/constants'
import { useNavigate } from 'react-router-dom'

interface Props {
  product: Product
}

const ProductInformation = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleQuantity = (value: number) => {
    setQuantity(value)
  }

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
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
          <span className="border-orange text-orange mr-1 border-b">{product.rating.toFixed(1)}</span>

          <Rating rating={product.rating} activeClassName="text-orange" />
        </div>
        <div className="mx-4 h-4 w-px bg-gray-300"></div>
        <div>
          <span className="border-orange mr-1">{formatNumberToSocialStyle(product.sold)}</span>
          <span className="text-gray-400">Đã bán</span>
        </div>
      </div>
      <div className="flex items-center  gap-4 bg-gray-50 p-5">
        <span className="text-sm  text-gray-400 line-through">
          {`₫ ${formatCurrency(product.price_before_discount)}`}
        </span>
        <span className="text-orange text-2xl ">{`₫ ${formatCurrency(product.price)}`}</span>
        <span className="bg-orange rounded-sm px-1 py-px text-xs font-semibold uppercase text-white">
          {percentDiscount(product.price_before_discount, product.price)} GIẢM
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <p className="capitalize">Số lượng</p>

        <QuantityController
          classNameWrapper="ml-7"
          value={quantity}
          onTypeValue={handleQuantity}
          onIncrease={handleQuantity}
          onDecrease={handleQuantity}
          max={product.quantity}
        />

        {product.quantity && <p className="ml-5">{`${product.quantity} sản phẩm có sẵn`}</p>}
      </div>
      <div className="flex gap-5">
        <button
          className="border-orange text-orange flex h-12 min-w-48 items-center justify-center gap-2 rounded-sm border bg-red-50 hover:bg-red-50/30"
          onClick={handleAddToCart}
        >
          <FaCartPlus size={20} />
          <p>Thêm vào giỏ hàng</p>
        </button>

        <button onClick={handleBuyNow} className=" bg-orange hover:bg-orange/90 h-12 min-w-28 rounded-sm text-white">
          <p>Mua ngay</p>
        </button>
      </div>
      <div className="my-4 h-px w-full bg-gray-100"></div>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <IoShieldCheckmarkSharp className="text-orange" /> <p>Hàng chính hãng 100%</p>
        </div>
        <div className="flex items-center gap-2 ">
          <FaShippingFast className="text-orange" /> <p>Miễn phí vận chuyển</p>
        </div>
      </div>
    </div>
  )
}
export default ProductInformation
