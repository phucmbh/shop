import { createSearchParams, Link } from 'react-router-dom'

import { ProductQueryConfig } from '@/@types'
import { PATH } from '@/constants'
import { usePagination } from '@/hook'
import { clsx } from 'clsx'

interface Props {
  queryConfig: ProductQueryConfig
  pageSize: number
}

const Pagination = ({ queryConfig, pageSize }: Props) => {
  const page = Number(queryConfig.page)
  const pagination = usePagination({ pageSize, page })

  const baseStyle = 'hover:border-orange cursor-pointer rounded border  px-2 py-1 shadow-sm hover:border'

  const renderPagination = () => {
    return pagination.map((pageNumber, index) => {
      if (pageNumber === 'DOTS')
        return (
          <span key={index} className="  px-2 py-1 text-lg  ">
            ...
          </span>
        )
      return (
        <Link
          to={{
            pathname: PATH.HOME,
            search: createSearchParams({
              ...queryConfig,
              page: pageNumber.toString()
            }).toString()
          }}
          key={index}
          className={clsx(baseStyle, {
            'bg-orange  text-white': +pageNumber === page,
            'bg-white': +pageNumber !== page
          })}
        >
          {pageNumber}
        </Link>
      )
    })
  }
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-1">
      {page === 1 ? (
        <span className="cursor-not-allowed rounded border border-slate-200 bg-slate-50  px-2 py-1 text-slate-400 shadow-none">
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: PATH.HOME,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className={clsx(baseStyle, 'bg-white')}
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className="cursor-not-allowed rounded border border-slate-200 bg-slate-50  px-2 py-1 text-slate-400 shadow-none ">
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: PATH.HOME,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className={clsx(baseStyle, 'bg-white')}
        >
          Next
        </Link>
      )}
    </div>
  )
}
export default Pagination
