import { Pagination, Product } from '@/components'
import { AsideFilter, SortProductList } from './components'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productApi } from '@/apis'
import { ProductListConfig } from '@/@types'
import { THREE_MINUTES } from '@/constants'
import { useProductQueryConfig } from '@/hook'

const ProductList = () => {
  const productQueryConfig = useProductQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', productQueryConfig],
    queryFn: () => {
      return productApi.getProducts(productQueryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: THREE_MINUTES
  })

  return (
    <div className="bg-neutral-100 py-5">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter queryConfig={productQueryConfig} />
          </div>
          {productsData && (
            <div className="col-span-9 min-h-[800px]">
              <SortProductList
                queryConfig={productQueryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              />

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {productsData.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={productQueryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductList
