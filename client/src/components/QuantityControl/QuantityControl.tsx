import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { InputNumber, InputNumberProps } from '../Input'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
  classNameInput?: string
  classNameButtonRemove?: string
  classNameButtonAdd?: string
}

const QuantityControl = ({
  max,
  onIncrease,
  onDecrease,
  onType,
  value,

  classNameWrapper,
  classNameInput = 'h-8 w-14  border border-x-0 border-gray-300 px-2 py-1 outline-none text-center focus:shadow-sm',
  classNameButtonRemove = 'size-8 rounded-l-sm border border-gray-300 px-2 py-1 text-gray-500 ',
  classNameButtonAdd = 'size-8 rounded-r-sm border border-gray-300 px-2 py-1 text-gray-500',
  ...rest
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    console.log(_value)
    if (max && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      <button className={classNameButtonRemove} onClick={decrease}>
        <IoMdRemove />
      </button>
      <InputNumber
        value={value}
        type="text"
        classNameInput={classNameInput}
        classNameError="hidden"
        onChange={handleChange}
        {...rest}
      />
      <button className={classNameButtonAdd} onClick={increase}>
        <IoMdAdd />
      </button>
    </div>
  )
}
export default QuantityControl
