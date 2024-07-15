import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { QueryConfig } from '../ProductList'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { ORDER, PATH, SORT_BY } from '@/constants'
import { ProductListConfig } from '@/@types'
import clsx from 'clsx'
import { omit } from 'lodash'

type Props = {
  queryConfig: QueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const navigate = useNavigate()
  const page = Number(queryConfig.page)
  const { sort_by, order } = queryConfig

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
        <section className="flex flex-wrap items-center gap-2">
          <span>Sắp xếp theo</span>

          <button
            className={clsx('bg-white px-3 py-1 shadow-sm hover:bg-gray-100', {
              ' bg-[#fb5533] text-white hover:bg-orange/80  hover:text-white': isSortByActive(SORT_BY.VIEW)
            })}
            onClick={() => handleSort(SORT_BY.VIEW)}
          >
            Phổ biến
          </button>

          <button
            className={clsx('bg-white px-3 py-1 shadow-sm hover:bg-gray-100', {
              ' bg-[#fb5533] text-white hover:bg-orange/80  hover:text-white': isSortByActive(SORT_BY.CREATED_AT)
            })}
            onClick={() => handleSort(SORT_BY.CREATED_AT)}
          >
            Mới nhất
          </button>

          <button
            className={clsx('] bg-white px-3 py-1 shadow-sm hover:bg-gray-100', {
              ' bg-[#fb5533] text-white hover:bg-orange/80  hover:text-white': isSortByActive(SORT_BY.SOLd)
            })}
            onClick={() => handleSort(SORT_BY.SOLd)}
          >
            Bán chạy
          </button>

          <select
            className={clsx(' px-3  py-1 capitalize outline-none', {
              'bg-orange text-white hover:bg-orange/80': isSortByActive(SORT_BY.PRICE),
              'bg-white text-black hover:bg-slate-100': !isSortByActive(SORT_BY.PRICE)
            })}
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as ORDER)}
          >
            <option className="bg-white text-black" value="" disabled>
              Giá
            </option>
            <option className="bg-white text-black" value={ORDER.ASC}>
              Giá: Thấp đến cao
            </option>
            <option className="bg-white text-black" value={ORDER.DESC}>
              Giá: Cao đến thấp
            </option>
          </select>
        </section>
        <section className="flex basis-[100px] items-center justify-center gap-1">
          <div className="grow">
            <span className="text-orange">{page}</span>
            <span>{`/${pageSize}`}</span>
          </div>
          {page === 1 ? (
            <span className="cursor-not-allowed rounded border border-slate-200 bg-slate-50  px-2 py-1 text-slate-400 shadow-none">
              <MdKeyboardArrowLeft />
            </span>
          ) : (
            <Link
              to={{
                pathname: PATH.HOME,
                search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
              }}
              className="rounded-sm bg-white px-2 py-1 shadow hover:bg-gray-100"
            >
              <MdKeyboardArrowLeft />
            </Link>
          )}

          {page === pageSize ? (
            <span className="cursor-not-allowed rounded border border-slate-200 bg-slate-50  px-2 py-1 text-slate-400 shadow-none ">
              <MdKeyboardArrowRight />
            </span>
          ) : (
            <Link
              to={{
                pathname: PATH.HOME,
                search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
              }}
              className="rounded-sm bg-white px-2 py-1 shadow hover:bg-gray-100"
            >
              <MdKeyboardArrowRight />
            </Link>
          )}
        </section>
      </div>
    </div>
  )
}
export default SortProductList
