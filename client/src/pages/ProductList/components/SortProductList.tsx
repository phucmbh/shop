import { Button } from '@/components'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { QueryConfig } from '../ProductList'
import { createSearchParams, Link } from 'react-router-dom'
import { PATH } from '@/constants'

type Props = {
  queryConfig: QueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const page = Number(queryConfig.page)

  return (
    <div className="flex flex-wrap items-center  gap-2 bg-gray-300/40 px-3 py-4">
      <div className="flex basis-full flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span>Sắp xếp theo</span>
          <Button className="bg-white px-3 py-1 shadow-sm hover:bg-gray-100">Phổ biến</Button>
          <Button className="bg-orange hover:bg-orange/80 px-3 py-1 text-white shadow-sm">Mới nhất</Button>
          <Button className="bg-white px-3 py-1 shadow-sm hover:bg-gray-100">Bán chạy</Button>
          <select className="px-3 py-1 shadow-sm hover:bg-gray-100" value="" onChange={() => null}>
            <option value="" disabled>
              Giá
            </option>
            <option value="price:asc" className="hover:bg-gray-100">
              Giá: Thấp đến cao
            </option>
            <option value="price:desc" className="hover:bg-gray-100">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className="flex basis-[100px] items-center justify-center gap-1">
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
        </div>
      </div>
    </div>
  )
}
export default SortProductList
