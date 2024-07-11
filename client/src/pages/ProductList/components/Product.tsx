import { FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <Link to="">
      <div className="flex h-full flex-col overflow-hidden rounded-sm bg-white shadow hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative pt-[100%] ">
          <img
            className="absolute top-0 size-full   object-cover"
            src="https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg"
            alt=""
          />
        </div>

        <div className="flex grow flex-col gap-3 p-2">
          <div className="line-clamp-2 break-all text-xs">ĐIỆN THOẠI VSMART ACTIVE 3 6GB/64GB - HÀNG CHÍNH HÃNG</div>
          <div className="mt-auto flex gap-1 text-sm">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className=" text-xs">₫</span>
              189.000
            </div>
            <div className="text-orange max-w-[50%] truncate">
              <span className="text-xs">₫</span>189.000
            </div>
          </div>
          <div className="self-end">
            <div className="flex items-center gap-2 self-end text-xs ">
              <div className="flex items-center text-gray-200">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div className="relative" key={index}>
                      <div className="absolute top-0 size-full overflow-hidden" style={{ width: '50%' }}>
                        <FaStar className="text-yellow-400" />
                      </div>
                      <FaStar className="text-gray-300" />
                    </div>
                  ))}
              </div>

              <div>
                <span className="">0 Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Product
