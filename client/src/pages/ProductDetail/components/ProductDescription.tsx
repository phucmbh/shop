import { Product } from '@/@types'
import DOMPurify from 'dompurify'

interface Props {
  product: Product
}

const ProductDescription = ({ product }: Props) => {
  return (
    <div>
      <p className=" bg-gray-100 p-4 text-xl capitalize">Mô tả sản phẩm</p>

      <div
        className="p-4 text-sm leading-loose"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
      ></div>
    </div>
  )
}
export default ProductDescription
