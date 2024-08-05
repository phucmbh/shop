import { ExtendedPurchase } from '@/@types'

interface Props {
  purchases: ExtendedPurchase[]
  setPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const CartTitle = ({ purchases, setPurchases }: Props) => {
  const isAllChecked = purchases.length > 0 ? purchases.every((purchase) => purchase.checked) : false

  const handleCheckeAll = () => {
    setPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  return (
    <div className="my-5">
      <div className="grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow">
        <div className="col-span-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center pr-3">
              <input
                type="checkbox"
                className="size-5 accent-orange"
                checked={isAllChecked}
                onChange={handleCheckeAll}
              />
            </div>
            <div className="grow text-black">Sản phẩm</div>
          </div>
        </div>
        <div className="col-span-6">
          <div className="grid grid-cols-5 text-center">
            <div className="col-span-2">Đơn giá</div>
            <div className="col-span-1">Số lượng</div>
            <div className="col-span-1">Số tiền</div>
            <div className="col-span-1">Thao tác</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartTitle
