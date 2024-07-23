
import { ExtendedPurchase } from '@/@types'
import CartItem from './CartItem'

interface Props {
  purchases: ExtendedPurchase[]
  setPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const CartList = ({ purchases, setPurchases }: Props) => {
  return (
    <>
      {purchases.length > 0 && (
        <div className="my-3 rounded-sm bg-white p-5 shadow">
          {purchases.map((purchase, index) => (
            <CartItem key={index} purchase={purchase} setPurchases={setPurchases} index={index} />
          ))}
        </div>
      )}
    </>
  )
}
export default CartList
