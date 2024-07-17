import { Product } from '@/@types'
import { Rating } from '@/components'
import { formatCurrency, formatNumberToSocialStyle, percentDiscount } from '@/utils/util'
import ProductQuantity from './ProductQuantity'
import { useForm } from 'react-hook-form'
import { FaCartPlus } from 'react-icons/fa6'

interface Props {
  product: Product
}

const ProductInformation = ({ product }: Props) => {
  const { control } = useForm()
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
      <ProductQuantity control={control} product={product} />
      <div className="flex gap-5">
        <button className="border-orange text-orange flex h-12 min-w-48 items-center justify-center gap-2 rounded-sm border bg-red-50 hover:bg-red-50/30">
          <FaCartPlus size={20} />
          <p>Thêm vào giỏ hàng</p>
        </button>

        <button className=" bg-orange hover:bg-orange/90 h-12 min-w-28 rounded-sm text-white">
          <p>Mua ngay</p>
        </button>
      </div>
    </div>
  )
}
export default ProductInformation
