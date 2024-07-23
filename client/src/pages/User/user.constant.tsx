import { PATH } from '@/constants'
import { MdEventNote, MdManageAccounts } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

export const userSideNav = [
  {
    path: PATH.PROFILE,
    icon: <MdManageAccounts />,
    text: 'Tài khoản của tôi'
  },
  {
    path: PATH.CHANGE_PASSWORD,
    icon: <RiLockPasswordLine />,
    text: 'Đổi mật khẩu'
  },
  {
    path: PATH.PURCHASE,
    icon: <MdEventNote />,
    text: 'Đơn mua'
  }
]
