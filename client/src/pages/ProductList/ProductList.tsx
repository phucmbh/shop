import { Container, Pagination } from '@/components'
import { AsideFilter, Product, SortProductList } from './components'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ApiProduct } from '@/apis'
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
      page: queryParams.page || '1',
      limit: queryParams.limit,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => ApiProduct.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })

  return (
    <div className="bg-gray-200 py-5">
      <Container>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter />
          </div>
          {data && (
            <div className="col-span-9">
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {data.data.data.products.map((product) => (
                  <div className="col-span-1" key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
export default ProductList
