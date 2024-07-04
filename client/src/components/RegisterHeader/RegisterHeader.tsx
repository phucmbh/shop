import { IconShopee } from '@/utils/icons'
import { Link, useMatch } from 'react-router-dom'

const RegisterHeader = () => {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className="py-5">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            <Link to="/" className="h-8 text-orange lg:h-11">
              <IconShopee />
            </Link>
            <span className="text-xl lg:text-2xl">{isRegister ? 'Đăng kí' : 'Đăng nhập'}</span>
          </div>
          <span>Bạn cần giúp đỡ</span>
        </nav>
      </div>
    </header>
  )
}
export default RegisterHeader
