import { Product as ProductType } from '@/@types'
import { Rating } from '@/components'
import { PATH } from '@/constants'
import { formatCurrency, formatNumberToSocialStyle, genarateSlugify } from '@/utils/util'
import { Link } from 'react-router-dom'

interface Props {
  product: ProductType
}

const Product = ({ product }: Props) => {
  return (
    <Link to={`${PATH.PRODUCTS}/${genarateSlugify({ name: product.name, id: product._id })}`}>
      <div className="flex h-full flex-col overflow-hidden rounded-sm bg-white shadow hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative pt-[100%] ">
          <img className="absolute top-0 size-full   object-cover" src={product.image} alt={product.name} />
        </div>

        <div className="flex grow flex-col gap-3 p-2">
          <div className="line-clamp-2 break-all text-xs">{product.name}</div>
          <div className="mt-auto flex items-baseline gap-1 text-sm">
            <div className="max-w-[50%] truncate align-bottom text-xs text-gray-400 line-through">
              <span>₫</span>
              {formatCurrency(product.price_before_discount)}
            </div>
            <div className="text-orange max-w-[50%] truncate">
              <span className="text-xs">₫</span>
              {formatCurrency(product.price)}
            </div>
          </div>
          <div className="self-end">
            <div className="flex items-center gap-2 text-xs ">
              <Rating rating={product.rating} />

              <div>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className="ml-1">Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Product
