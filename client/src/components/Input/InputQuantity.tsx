import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { InputNumber, InputNumberProps } from '.'
import { useState } from 'react'
import clsx from 'clsx'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onTypeValue?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
  classNameInput?: string
  classNameButtonRemove?: string
  classNameButtonAdd?: string
}

const InputQuantity = ({
  max,
  onIncrease, // Set value when click increase
  onDecrease, // Set value when click decrease
  onFocusOut,
  onTypeValue,
  value = 1,

  classNameWrapper,
  ...rest
}: Props) => {
  const [quantity, setQuantity] = useState(Number(value))

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value)
    if (max && value < max) value = Math.max(1, value)
    if (max && value > max) value = max

    onTypeValue && onTypeValue(value)
    setQuantity(value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }

  //Do not set state here because it will rerender and value maybe wrong
  const handleQuantityClick = (delta: number) => {
    if (max && quantity + delta < max) return Math.max(1, quantity + delta)
    if (max && quantity + delta > max) return max
    return Math.max(1, quantity + delta)
  }

  const handleIncrement = () => {
    const value = handleQuantityClick(1)
    onIncrease && onIncrease(value)
    setQuantity(value)
  }

  const handleDecrement = () => {
    const value = handleQuantityClick(-1)
    onDecrease && onDecrease(value)
    setQuantity(value)
  }

  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      <button
        className={clsx('flex size-8 items-center justify-center rounded-l-sm border border-gray-300 text-black ', {
          ' text-gray-400': value === 1
        })}
        onClick={handleDecrement}
      >
        <IoMdRemove />
      </button>
      <InputNumber
        value={value || quantity}
        type="text"
        classNameInput="h-8 w-14 border border-x-0 border-gray-300 flex items-center justify-center outline-none text-center focus:shadow-sm"
        classNameError="hidden"
        onChange={handleType}
        onBlur={handleBlur}
        {...rest}
      />
      <button
        className={clsx('flex size-8 items-center justify-center rounded-l-sm border border-gray-300 text-black ', {
          ' text-gray-400': value === max
        })}
        onClick={handleIncrement}
      >
        <IoMdAdd />
      </button>
    </div>
  )
}
export default InputQuantity
