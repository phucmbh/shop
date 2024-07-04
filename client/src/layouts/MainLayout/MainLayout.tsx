import { Footer, Header } from '@/components'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default MainLayout
