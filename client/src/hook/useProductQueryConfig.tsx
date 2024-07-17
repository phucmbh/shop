import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'
import { ProductQueryConfig } from '@/@types'

const useProductQueryConfig = () => {
  const queryParams: ProductQueryConfig = useQueryParams()
  const queryConfig: ProductQueryConfig = omitBy(
    {
      name: queryParams.name,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
      order: queryParams.order,
      page: queryParams.page || '1',
      limit: queryParams.limit || '20'
    },
    isUndefined
  )

  return queryConfig
}
export default useProductQueryConfig
