import { Footer, CartHeader } from '@/components'
interface Props {
  children: React.ReactNode
}

const CartLayout = ({ children }: Props) => {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  )
}
export default CartLayout
