import { Link } from 'react-router-dom'
import {
  FaFacebook,
  IoMdNotificationsOutline,
  MdHelpOutline,
  MdKeyboardArrowDown,
  RiGlobalLine,
  RiInstagramFill
} from '@/utils/icons'

import { Popover } from '../Popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiAuth } from '@/apis'
import { useContext, useState } from 'react'
import { AppContext } from '@/context/app.context'

import { Button } from '../Button'
import { PATH, PURCHASES_STATUS } from '@/constants'
import { noproductImage } from '@/utils/images'
import { getUrlAvatar } from '@/utils/util'

interface Props {
  className?: string
}

const TopHeader = ({ className }: Props) => {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const [language, setLanguage] = useState('Tiếng Việt')
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: ApiAuth.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className={className}>
      <div className="container">
        <div className=" flex min-h-[25px] items-center justify-between   text-xs text-white">
          <div>
            <div className="hidden xl:flex">
              <Link to="/" className=" border-r-2 border-gray-100/40 pr-2 hover:text-gray-300">
                <span>Kênh người bán</span>
              </Link>
              <Link to="/" className="border-r-2 border-gray-100/40 px-2  hover:text-gray-300">
                <span>Trở thành người bán hàng shopee</span>
              </Link>
              <Link to="/" className=" border-r-2 border-gray-100/40 px-2  hover:text-gray-300">
                <span>Tải ứng dụng</span>
              </Link>
              <span className="flex items-center gap-2 pl-2">
                <h3>Kết nối</h3>

                <Link to="https://facebook.com/ShopeeVN">
                  <FaFacebook size={16} />
                </Link>
                <Link to="https://instagram.com/Shopee_VN">
                  <RiInstagramFill size={19} />
                </Link>
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Popover
              popoverParent={
                <div className="flex cursor-pointer items-center gap-1  hover:text-gray-300">
                  <IoMdNotificationsOutline size={20} />
                  <span className="hidden xl:inline-block">Thông báo</span>
                </div>
              }
            >
              <div className="rounded-sm bg-white shadow">
                <div className="flex h-[250px] w-[400px] flex-col items-center justify-center ">
                  <img src={noproductImage} className="size-[120px]" />
                  <h3>Đăng nhập để xem thông báo</h3>
                </div>
                <div className="grid grid-cols-2 text-center">
                  <Link to={PATH.LOGIN} className="hover:text-orange bg-slate-50 py-3 hover:bg-slate-200">
                    Đăng nhập
                  </Link>
                  <Link to={PATH.REGISTER} className="hover:text-orange bg-slate-50 py-3 hover:bg-slate-200">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </Popover>

            <Link to="/" className="flex items-center  gap-1  px-2 hover:text-gray-300">
              <MdHelpOutline size={18} />
              <span className="hidden xl:inline-block">Hỗ trợ</span>
            </Link>
            <Popover
              popoverParent={
                <div className="flex cursor-pointer  items-center gap-1 px-2 hover:text-gray-300">
                  <RiGlobalLine size={18} />
                  <span className="hidden xl:inline-block">{language}</span>
                  <MdKeyboardArrowDown size={20} />
                </div>
              }
            >
              <div className="relative flex  w-[180px] flex-col  items-start gap-3 rounded-sm bg-white text-sm ">
                <button
                  onClick={() => setLanguage('Tiếng Việt')}
                  className="hover:text-orange w-full px-2 py-3 text-start hover:bg-slate-50"
                >
                  Tiếng việt
                </button>
                <button
                  onClick={() => setLanguage('English')}
                  className="hover:text-orange w-full px-2 py-3 text-start hover:bg-slate-50"
                >
                  English
                </button>
              </div>
            </Popover>

            {!isAuthenticated && (
              <>
                <Link to={PATH.REGISTER} className="border-r-2 border-gray-100/40 px-4  hover:text-gray-300">
                  Đăng kí
                </Link>
                <Link to={PATH.LOGIN} className="px-4 hover:text-gray-300">
                  Đăng nhập
                </Link>
              </>
            )}

            {isAuthenticated && (
              <Popover
                popoverParent={
                  <div className="flex cursor-pointer items-center gap-1">
                    <img src={getUrlAvatar(profile?.avatar)} alt="" className="size-8 rounded-full" />
                    <span>{profile?.email}</span>
                  </div>
                }
              >
                <div className="relative flex  w-[150px] flex-col  items-start  rounded-sm bg-white text-sm ">
                  <Link to={PATH.PROFILE} className="w-full  px-2 py-3 hover:bg-slate-50 hover:text-cyan-500">
                    Tài khoản của tôi
                  </Link>
                  <Link to={PATH.PURCHASE} className="w-full  px-2 py-3 hover:bg-slate-50 hover:text-cyan-500">
                    Đơn mua
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="flex  w-full justify-start gap-2 px-2 py-3 hover:bg-slate-50 hover:text-cyan-500"
                    isLoading={logoutMutation.isPending}
                    disabled={logoutMutation.isPending}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TopHeader
