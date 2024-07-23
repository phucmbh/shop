import { PATH } from '@/constants'
import { FaPen } from 'react-icons/fa'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { userSideNav } from '../user.constant'
import clsx from 'clsx'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'
import { getUrlAvatar } from '@/utils/util'

const UserSideNav = () => {
  const location = useLocation()
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
        {userSideNav.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              clsx('hover:text-orange mb-2 flex items-center gap-3', isActive && 'text-orange')
            }
          >
            <span>{item.icon}</span> <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
export default UserSideNav
