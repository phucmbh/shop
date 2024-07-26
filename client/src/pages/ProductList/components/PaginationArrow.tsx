import { ProductQueryConfig } from '@/@types'
import { PATH } from '@/constants'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { createSearchParams, Link } from 'react-router-dom'

interface Props {
  page: number
  pageSize: number
  queryConfig: ProductQueryConfig
}

const PaginationArrow = ({ page, pageSize, queryConfig }: Props) => {
  return (
    <section className=" basis-[100px]">
      {pageSize !== 1 && (
        <div className="flex items-center justify-center gap-1">
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
              className="rounded-sm border border-slate-100 bg-white px-2 py-1 shadow-sm hover:bg-gray-100"
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
              className="rounded-sm border border-slate-200 bg-white px-2 py-1 shadow-sm hover:bg-gray-100"
            >
              <MdKeyboardArrowRight />
            </Link>
          )}
        </div>
      )}
    </section>
  )
}
export default PaginationArrow
