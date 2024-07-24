import { PurchaseListStatus } from '@/@types'
import { ApiPurchase } from '@/apis'
import { PATH, PURCHASES_STATUS } from '@/constants'
import { useQueryParams } from '@/hook'
import { formatCurrency, genarateSlugify } from '@/utils/util'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { ShopeeGuarantee } from '@/utils/icons'
import { createSearchParams, Link } from 'react-router-dom'

const HistoryPurchase = () => {
  const queryParams = useQueryParams()
  const status = Number(queryParams.status) || PURCHASES_STATUS.ALL

  const { data: purchaseData } = useQuery({
    queryKey: ['purchase', status],
    queryFn: () => ApiPurchase.getPurchases({ status: status as PurchaseListStatus })
  })

  console.log(purchaseData)

  const purchaseTabsLink = purchaseTabs.map((item) => (
    <Link
      key={item.status}
      className={clsx('  flex flex-1 items-center justify-center border-b-2 py-4', {
        'border-b-orange  text-orange': status === item.status,
        ' border-b-gray-200 text-black': status !== item.status
      })}
      to={{
        pathname: PATH.PURCHASE,
        search: createSearchParams({
          status: String(item.status)
        }).toString()
      }}
    >
      {item.name}
    </Link>
  ))

  return (
    <div>
      <div className="sticky -top-px  z-10 flex  bg-white  ">{purchaseTabsLink} </div>
      <div className="overflow-auto">
        <div className="min-w-[800px] ">
          {purchaseData?.data.data.map((purchase) => (
            <div className="">
              <Link
                key={purchase.product._id}
                to={`${PATH.PRODUCTS}/${genarateSlugify({ name: purchase.product.name, id: purchase.product._id })}`}
                className="mt-2 flex gap-3 rounded-sm  bg-white px-6 py-4 shadow-sm"
              >
                <div className="shrink-0">
                  <img src={purchase.product.image} alt={purchase.product.name} className="size-20 object-cover" />
                </div>
                <div className="grow overflow-hidden">
                  <div className="truncate ">{purchase.product.name}</div>
                  <div className="mb-1 mt-2 text-sm">x {purchase.buy_count}</div>
                  <span className=" grow-0 border border-green-600/70 p-[2px]  text-xs text-green-700/60">
                    Trả hàng miễn phí 15 ngày
                  </span>
                </div>

                <div className=" shrink-0">
                  <span className="mr-2 text-sm text-gray-500 line-through">
                    ₫ {formatCurrency(purchase.product.price_before_discount)}
                  </span>
                  <span className="text-orange text-sm ">₫ {formatCurrency(purchase.product.price)}</span>
                </div>
              </Link>
              <div className="relative w-full border-b border-dotted bg-white">
                <span className="absolute   top-0 size-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full  bg-gray-100"></span>

                <span className="absolute  right-0  h-[8px] w-[4px]  -translate-y-1/2 rounded-l-full bg-gray-100"></span>
              </div>
              <div className="h-20 bg-[#fffefb]">
                <div className="flex items-center justify-end p-6">
                  <ShopeeGuarantee />
                  <div className="ml-1">Thành tiền: </div>
                  <div className="text-orange ml-2 text-lg">
                    ₫ {formatCurrency(purchase.buy_count * purchase.price)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const purchaseTabs = [
  { status: PURCHASES_STATUS.ALL, name: 'Tất cả' },
  { status: PURCHASES_STATUS.WAIT_FOR_CONFIRMATION, name: 'Chờ xác nhận' },
  { status: PURCHASES_STATUS.WAIT_FOR_GETTING, name: 'Chờ lấy hàng' },
  { status: PURCHASES_STATUS.IN_PROGRESS, name: 'Đang giao' },
  { status: PURCHASES_STATUS.DELIVERED, name: 'Đã giao' },
  { status: PURCHASES_STATUS.CANCELLED, name: 'Đã hủy' }
]

export default HistoryPurchase
