import { Button, Input } from '@/components'
import { PriceForm, PriceSchema } from '@/utils/validate/price'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { CiFilter } from 'react-icons/ci'
import { FaList, FaRegStar, FaStar } from 'react-icons/fa6'
import { MdArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AsideFilter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PriceForm>({
    resolver: yupResolver(PriceSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <aside className="text-sm">
      <div className="flex items-center gap-3 border border-b-gray-300 py-4 text-black">
        <FaList size={20} />
        <span className="text-base font-bold capitalize">Tất cả danh mục</span>
      </div>
      <ul className="mt-4">
        <li className="mb-2 flex items-center gap-2">
         
          <MdArrowRight />
          <Link to="/"> Thời trang nam</Link>
        </li>
        <li className="mb-2 flex items-center gap-2">
          <MdArrowRight />
          <Link to="/"> Áo khoác</Link>
        </li>
        <li className="mb-2 flex items-center gap-2">
          <MdArrowRight />
          <Link to="/"> Áo vest</Link>
        </li>
      </ul>
      <div className="my-4 flex items-center  gap-3 text-black">
        <CiFilter size={20} />
        <span className="text-base font-bold uppercase">Bộ lọc tìm kiếm</span>
      </div>
      <div>
        <div className="capitalize">Theo danh mục</div>
        <ul className="mt-4">
          <li className="mb-2 flex  gap-2 ">
            <input type="checkbox" />
            <label>Thời trang nam</label>
          </li>
          <li className="mb-2 flex  gap-2">
            <input type="checkbox" />
            <label>Áo vest</label>
          </li>
          <li className="mb-2 flex  gap-2">
            <input type="checkbox" />
            <label>Áo vest</label>
          </li>
        </ul>
      </div>
      <form onSubmit={onSubmit} className="my-4 border border-b-gray-400">
        <div>Khoảng giá</div>
        <div className="mt-2 flex  ">
          <Input
            register={register}
            errorMessage={errors?.from?.message}
            type="text"
            placeholder="₫ TỪ"
            className=""
            classNameInput=" w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
          />

          <div className="mt-4 px-5">-</div>

          <Input
            register={register}
            errorMessage={errors?.to?.message}
            type="text"
            placeholder="₫ ĐẾN"
            className=""
            classNameInput=" w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
          />
        </div>
        <Button className="bg-orange hover:bg-orange/80 w-full p-2 uppercase text-white">Áp dụng</Button>
      </form>
      <div className="my-4 h-px border border-gray-300"></div>
      <div className="my-4 gap-3 text-black">
        <span className="text-base  ">Đánh giá</span>
        <ul className="my-3">
          <li className="py-1 pl-2">
            <Link to="/" className="flex items-center gap-2 text-sm text-yellow-400">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FaStar key={index} />
                ))}
              <span className="text-black">Trở lên</span>
            </Link>
          </li>
          <li className="py-1 pl-2">
            <Link to="/" className="flex items-center gap-2 text-sm text-yellow-400">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FaRegStar key={index} />
                ))}
              <span className="text-black">Trở lên</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="my-4 h-px border border-gray-300"></div>
      <Button className="bg-orange hover:bg-orange/80 w-full p-2 uppercase text-white ">Xóa tất cả</Button>
    </aside>
  )
}
export default AsideFilter
