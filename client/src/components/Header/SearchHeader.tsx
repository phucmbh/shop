import { FiShoppingCart, IconShopee, IoIosSearch } from '@/utils/icons'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { Popover } from '../Popover'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'
import useProductQueryConfig from '@/hook/useProductQueryConfig'
import { PATH, PURCHASES_STATUS, SORT_BY } from '@/constants'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { searchSchema, SearchSchemaType } from '@/utils/validate'
import { omit } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { purchaseApi } from '@/apis'
import { formatCurrency } from '@/utils/util'

const SearchHeader = () => {
  const { isAuthenticated } = useContext(AppContext)
  const productQueryConfig = useProductQueryConfig()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<SearchSchemaType>({
    resolver: yupResolver(searchSchema)
  })

  const omitValue = () => (productQueryConfig.sort_by === SORT_BY.PRICE ? ['sort_by', 'order'] : ['order'])

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams(omit({ ...productQueryConfig, name: data.search }, omitValue())).toString()
    })
  })

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }],
    queryFn: () => purchaseApi.getPurchases({ status: PURCHASES_STATUS.IN_CART })
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const SHOW_MAXIMUM_PRODUCTS = 5

  return (
    <div className="mt-4 grid grid-cols-12 items-center">
      <Link to={PATH.HOME} className="col-span-2 mr-10 ">
        <IconShopee />
      </Link>
      <div className="col-span-8 mr-9">
        <div>
          <form onSubmit={onSubmit}>
            <div className="flex rounded-sm bg-white p-[2px]">
              <input
                type="text"
                className="grow border-none px-3 py-1 text-base text-black outline-none"
                placeholder="Free ship đơn từ không 0 Đ"
                {...register('search')}
              />
              <button className="flex-shirnk-0 bg-orange rounded-sm px-5 py-1 text-white">
                <IoIosSearch size={20} />
              </button>
            </div>
          </form>

          <div className="mt-2">
            <Link to="/" className="mr-4">
              Săn iPhone 14 Pro Max 1k
            </Link>
            <Link to="/" className="mr-4">
              Balo nữ
            </Link>
            <Link to="/" className="mr-4">
              Ăn vặt
            </Link>
            <Link to="/">Quạt tích điện</Link>
          </div>
        </div>
      </div>
      <div className="col-span-1 justify-self-end">
        {purchasesInCart && (
          <Popover
            popoverParent={
              <div className="relative w-10 cursor-pointer">
                <FiShoppingCart size={28} />
                <span className="border-orange text-orange absolute right-0 top-[-5px] h-5 w-6 rounded-[2.75rem]  border-2 bg-white text-center ">
                  {purchasesInCart.length}
                </span>
              </div>
            }
          >
            <div className="flex max-h-[250px] w-[400px] flex-col rounded-sm   shadow">
              {isAuthenticated ? (
                <div className=" border border-gray-400/50  ">
                  <div className="rounded-sm bg-white pb-2">
                    <p className=" p-2 text-sm capitalize text-gray-400"> Sản phẩm mới thêm</p>
                    {purchasesInCart.slice(0, SHOW_MAXIMUM_PRODUCTS).map((purchase) => (
                      <div className="  flex cursor-pointer gap-2 p-2 hover:bg-gray-100" key={purchase._id}>
                        <div className="size-10 shrink-0 border">
                          <img src={purchase.product.image} />
                        </div>

                        <div className="  overflow-hidden">
                          <div className="truncate text-sm">{purchase.product.name}</div>
                        </div>
                        <div className="">
                          <span className="text-orange text-sm">{`₫${formatCurrency(purchase.product.price)}`}</span>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between p-2">
                      <p className="text-sm text-gray-500">{`${purchasesInCart.length > SHOW_MAXIMUM_PRODUCTS ? purchasesInCart.length - SHOW_MAXIMUM_PRODUCTS : ''} Thêm vào giỏ hàng`}</p>
                      <Link to="/" className="bg-orange rounded px-5 py-2 capitalize text-white">
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" flex h-[250px] flex-col items-center justify-center">
                  <img src="/no_product.png" className="size-[120px]" />
                  <h3>Chưa Có Sản Phẩm</h3>
                </div>
              )}
            </div>
          </Popover>
        )}
      </div>
    </div>
  )
}
export default SearchHeader
