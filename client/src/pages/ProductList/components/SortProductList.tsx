import { Button } from '@/components'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const SortProductList = () => {
  return (
    <div className="flex flex-wrap items-center  gap-2 bg-gray-300/40 px-3 py-4">
      <div className="flex basis-full flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span>Sắp xếp theo</span>
          <Button className="bg-white px-3 py-1 shadow-sm hover:bg-gray-100">Phổ biến</Button>
          <Button className="bg-orange hover:bg-orange/80 px-3 py-1 text-white shadow-sm">Mới nhất</Button>
          <Button className="bg-white px-3 py-1 shadow-sm hover:bg-gray-100">Bán chạy</Button>
          <select className="px-3 py-1 shadow-sm hover:bg-gray-100" value="">
            <option value="" disabled>
              Giá
            </option>
            <option value="price:asc" className="hover:bg-gray-100">
              Giá: Thấp đến cao
            </option>
            <option value="price:desc" className="hover:bg-gray-100">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className="flex basis-[100px] items-center justify-center gap-1">
          <div className="grow">
            <span className="text-orange">2</span>
            <span>/3</span>
          </div>
          <Button className="rounded-sm bg-white p-2 shadow hover:bg-gray-100">
            <MdKeyboardArrowLeft />
          </Button>

          <Button className="rounded-sm bg-white  p-2 shadow hover:bg-gray-100">
            <MdKeyboardArrowRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SortProductList
