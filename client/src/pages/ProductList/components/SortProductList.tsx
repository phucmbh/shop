import { createSearchParams, useNavigate } from 'react-router-dom'
import { ORDER, PATH, SORT_BY } from '@/constants'
import { ProductListConfig, ProductQueryConfig } from '@/@types'
import clsx from 'clsx'
import omit from 'lodash/omit'
import PaginationArrow from './PaginationArrow'
import { useTranslation } from 'react-i18next'

type Props = {
  queryConfig: ProductQueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation('home')
  const page = Number(queryConfig.page)
  const { sort_by = SORT_BY.CREATED_AT, order } = queryConfig

  const isSortByActive = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return isSortByActive(sortByValue)
      ? navigate({
          pathname: PATH.HOME,
          search: createSearchParams(omit(queryConfig, ['sort_by', 'order'])).toString()
        })
      : navigate({
          pathname: PATH.HOME,
          search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue }, ['order'])).toString()
        })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    return navigate({
      pathname: PATH.HOME,
      search: createSearchParams({ ...queryConfig, sort_by: SORT_BY.PRICE, order: orderValue }).toString()
    })
  }

  return (
    <div className="flex flex-wrap items-center  gap-2 bg-gray-300/40 px-3 py-4">
      <div className="flex basis-full flex-wrap items-center justify-between gap-2">
        <section className="flex flex-wrap items-center gap-2 capitalize">
          <span>{t('sort by')}</span>

          <button
            className={clsx('px-3 py-1 capitalize shadow-sm', {
              ' bg-orange text-white hover:bg-orange/80  hover:text-white': isSortByActive(SORT_BY.VIEW),
              'bg-white hover:bg-gray-100': !isSortByActive(SORT_BY.VIEW)
            })}
            onClick={() => handleSort(SORT_BY.VIEW)}
          >
            {t('popular')}
          </button>

          <button
            className={clsx(' px-3 py-1 capitalize shadow-sm ', {
              ' bg-orange text-white hover:bg-orange/80  hover:text-white': isSortByActive(SORT_BY.CREATED_AT),
              ' bg-white  hover:bg-gray-100': !isSortByActive(SORT_BY.CREATED_AT)
            })}
            aria-label="pagination"
            onClick={() => handleSort(SORT_BY.CREATED_AT)}
          >
            {t('newest')}
          </button>

          <button
            className={clsx(']  px-3 py-1 capitalize shadow-sm ', {
              ' bg-[#fb5533] text-white hover:bg-orange/80  hover:text-white': isSortByActive(SORT_BY.SOLd),
              ' bg-white hover:bg-gray-100': !isSortByActive(SORT_BY.SOLd)
            })}
            aria-label="pagination"
            onClick={() => handleSort(SORT_BY.SOLd)}
          >
            {t('bestselling')}
          </button>

          <select
            className={clsx(' px-3  py-1 capitalize outline-none', {
              'bg-orange text-white hover:bg-orange/80': isSortByActive(SORT_BY.PRICE),
              'bg-white text-black hover:bg-slate-100': !isSortByActive(SORT_BY.PRICE)
            })}
            aria-labelledby="select-sort-by-price"
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as ORDER)}
          >
            <option className="bg-white capitalize text-black" value="" disabled>
              {t('price')}
            </option>
            <option className="bg-white text-black" value={ORDER.ASC}>
              {t('price: high to low')}
            </option>
            <option className="bg-white text-black" value={ORDER.DESC}>
              {t('price: low to high')}
            </option>
          </select>
        </section>
        <PaginationArrow page={page} pageSize={pageSize} queryConfig={queryConfig} />
      </div>
    </div>
  )
}
export default SortProductList
