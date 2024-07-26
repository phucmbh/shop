import { Product } from '@/@types'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'

interface Props {
  product: Product
}

const ProductDescription = ({ product }: Props) => {
  const { t } = useTranslation('product')
  return (
    <div>
      <p className=" bg-gray-100 p-4 text-xl capitalize">{t('product description')}</p>

      <div
        className="p-4 text-sm leading-loose"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
      ></div>
    </div>
  )
}
export default ProductDescription
