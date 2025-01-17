import { Product as ProductType } from '@/@types'
import { ApiProduct } from '@/apis'
import { Product } from '@/components'
import { THREE_MINUTES } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

interface Props {
  product: ProductType
}

const RelatedProduct = ({ product }: Props) => {
  const { t } = useTranslation('product')
  const queryConfig = { category: product.category._id, page: '1', limit: '20' }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return ApiProduct.getProducts(queryConfig)
    },
    staleTime: THREE_MINUTES
  })

  const productList = productsData?.data.data.products

  return (
    <div>
      {productList && (
        <div>
          <p className=" bg-gray-100 p-4 text-xl capitalize">{t('related product')}</p>
          <div className="mt-8">
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {productList.map((product) => (
                <div className="col-span-1" key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default RelatedProduct
