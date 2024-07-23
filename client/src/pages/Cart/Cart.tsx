import { purchaseApi } from '@/apis'
import { CartList, CartTitle, TotalCart } from './components'
import { useQuery } from '@tanstack/react-query'
import { PATH, PURCHASES_STATUS } from '@/constants'
import { Fragment, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { keyBy } from 'lodash'
import { PurchaseContext } from '@/context/purchase.context'
import { noproductImage } from '@/utils/images'

const Cart = () => {
  const { purchases, setPurchases } = useContext(PurchaseContext)
  const location = useLocation()
  const purchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId

  const { data: purchasesData } = useQuery({
    queryKey: ['purchases', { status: PURCHASES_STATUS.IN_CART }],
    queryFn: () => purchaseApi.getPurchases({ status: PURCHASES_STATUS.IN_CART })
  })

  console.log('card')

  useEffect(() => {
    setPurchases((prev) => {
      const purchasesObject = keyBy(prev, '_id') //Check has checked when refetch
      return (
        purchasesData?.data.data?.map((purchase) => ({
          ...purchase,
          disable: false,
          checked: purchase._id === purchaseIdFromLocation || Boolean(purchasesObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesData, purchaseIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <div className="bg-neutral-100">
      <div className="container ">
        {purchases.length > 0 ? (
          <Fragment>
            <div className="overflow-auto">
              <div className="min-w-[1000px] ">
                <CartTitle purchases={purchases} setPurchases={setPurchases} />
                <CartList purchases={purchases} setPurchases={setPurchases} />
              </div>
            </div>
            <TotalCart purchases={purchases} setPurchases={setPurchases} />
          </Fragment>
        ) : (
          <div className=" flex h-[500px] flex-col items-center justify-center gap-3 ">
            <img src={noproductImage} className="size-[120px]" />
            <h3 className="text-gray-500">Giỏ hàng của bạn còn trống</h3>
            <Link to={PATH.HOME} className="bg-orange hover:bg-orange/90 rounded-sm px-10 py-2 uppercase text-white">
              Mua ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
export default Cart
