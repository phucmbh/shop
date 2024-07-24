import { ApiProduct } from '@/apis'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ProductDescription, ProductImage, ProductInformation, RelatedProduct } from './components'
import { getIdFromSlugify } from '@/utils/util'

const ProductDetail = () => {
  const { id } = useParams()
  const productId: string = getIdFromSlugify(id as string)

  const { data: productDetailData } = useQuery({
    queryKey: ['products', productId],
    queryFn: () => ApiProduct.getProductDetail(productId)
  })

  const product = productDetailData?.data.data

  return (
    <div>
      {product && (
        <div className=" bg-gray-200 py-6">
          <div className="container bg-white shadow">
            <div className=" container p-4">
              <div className="grid grid-cols-12 gap-9">
                <div className="col-span-5">
                  <ProductImage product={product} />
                </div>
                <div className="col-span-7 ">
                  <ProductInformation product={product} />
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-8 bg-white p-4 shadow">
            <ProductDescription product={product} />
          </div>

          <div className="container mt-8 bg-white p-4 shadow">
            <RelatedProduct product={product} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
