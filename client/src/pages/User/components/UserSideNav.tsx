import { PATH } from '@/constants'
import { FaPen } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'
import { getUrlAvatar } from '@/utils/util'
import { MdEventNote, MdManageAccounts } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

const UserSideNav = () => {
  const { profile } = useContext(AppContext)

  return (
    <div className="min-w-[550px]">
      <div className="flex items-center border-b border-b-gray-200 py-4">
        <Link to={PATH.PROFILE} className="size-12 shrink-0 overflow-hidden rounded-full border border-gray-500">
          <img src={getUrlAvatar(profile?.avatar)} alt="" className="size-full object-cover" />
        </Link>
        <div className="grow pl-2">
          <div className="font-semibold">phucmbh</div>
          <Link to={PATH.PROFILE} className="mt-1 flex items-center gap-1 text-gray-500">
            <FaPen size={12} /> <span className="text-xs capitalize">Sửa hồ sơ</span>
          </Link>
        </div>
      </div>
      <div className="mt-5">
        {userTabs.map((item, index) => (
          <NavLink key={index} to={item.path}>
            {({ isActive }) => (
              <div className="mb-3 flex items-center gap-2">
                <span>{item.icon}</span>
                <span className={clsx('hover:text-orange ', isActive && 'text-orange')}>{item.text}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

const userTabs = [
  {
    path: PATH.PROFILE,
    icon: <MdManageAccounts size={20} className="text-sky-700" />,
    text: 'Tài khoản của tôi'
  },
  {
    path: PATH.CHANGE_PASSWORD,
    icon: <RiLockPasswordLine size={20} className="text-cyan-700" />,
    text: 'Đổi mật khẩu'
  },
  {
    path: PATH.PURCHASE,
    icon: <MdEventNote size={20} className="text-teal-700" />,
    text: 'Đơn mua'
  }
]

export default UserSideNav
