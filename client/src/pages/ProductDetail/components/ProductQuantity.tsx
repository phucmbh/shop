import { Product } from '@/@types'
import { InputNumber } from '@/components'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'

interface Props {
  control: Control<FieldValues, any>
  product: Product
}
const ProductQuantity = ({ control, product }: Props) => {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <p className="capitalize">Số lượng</p>
      <div className="ml-7 flex ">
        <button className="size-8 rounded-l-sm border border-gray-300 p-1 text-gray-500 ">
          <IoMdRemove />
        </button>
        <Controller
          name="product-quantity"
          control={control}
          render={({ field }) => {
            return (
              <InputNumber
                type="text"
                classNameInput="h-8 w-14  border border-x-0 border-gray-300 px-2 py-1 outline-none text-center focus:shadow-sm"
                classNameError="hidden"
                {...field}
              />
            )
          }}
        />

        <button className=" rounded-r-sm border border-gray-300 px-2 py-1 text-gray-500">
          <IoMdAdd />
        </button>
      </div>
      {product.quantity && <p className="ml-5">{`${product.quantity} sản phẩm có sẵn`}</p>}
    </div>
  )
}
export default ProductQuantity
