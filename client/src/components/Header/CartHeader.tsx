import { PATH } from '@/constants'
import TopHeader from './TopHeader'

import { IconShopee, IoIosSearch } from '@/utils/icons'
import { Link } from 'react-router-dom'
import { useProductSearch } from '@/hook'

const CartHeader = () => {
  const { onSubmitSearch, register } = useProductSearch()
  return (
    <div>
      <TopHeader className="bg-orange py-2" />

      <div className=" border border-b-gray-200 py-5">
        <div className="container ">
          <nav className="md:flex md:items-center md:justify-between">
            <Link to={PATH.HOME} className="text-orange flex shrink-0 items-end">
              <div>
                <IconShopee className=" h-8 md:h-11" />
              </div>
              <div className="bg-orange mx-4 h-6 w-px md:h-8" />
              <div className=" capitalize md:text-xl">Giỏ hàng</div>
            </Link>
            <form className="mt-3 md:mt-0 md:w-1/2" onSubmit={() => null}>
              <div className="border-orange flex rounded-sm border-2">
                <input
                  type="text"
                  className="w-full grow border-none bg-transparent px-3 py-1 text-black outline-none"
                  placeholder="Free Ship Đơn Từ 0Đ"
                  {...register('search')}
                />
                <button className="bg-orange shrink-0 rounded-sm px-8 py-2 hover:opacity-90" onClick={onSubmitSearch}>
                  <IoIosSearch className="size-5 text-white" />
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default CartHeader
