import { Container, Pagination } from '@/components'
import { AsideFilter, Product, SortProductList } from './components'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productApi } from '@/apis'
import useQueryParams from '@/hook/useQueryParams'
import { ProductListConfig } from '@/@types'
import { isUndefined, omitBy } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      name: queryParams.name,
      sort_by: queryParams.sort_by || 'createdAt',
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
      order: queryParams.order,
      page: queryParams.page || '1',
      limit: queryParams.limit || '5'
    },
    isUndefined
  )

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })

  return (
    <div className="bg-gray-200 py-5">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter queryConfig={queryConfig} />
          </div>
          {productsData && (
            <div className="col-span-9">
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {productsData.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
export default ProductList
