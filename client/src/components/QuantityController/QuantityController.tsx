import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { InputNumber, InputNumberProps } from '../Input'
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

const QuantityController = ({
  max,
  onIncrease, // Set value when click increase
  onDecrease, // Set value when click decrease
  onFocusOut,
  onTypeValue,
  value = 1,

  classNameWrapper,
  ...rest
}: Props) => {
  const [localValue, setLocalValue] = useState(Number(value))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onTypeValue && onTypeValue(_value)
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }

  const handleIncrease = () => {
    let _value = Number(localValue) + 1
    if (max && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const handleDecrease = () => {
    let _value = Number(localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      <button
        className={clsx('flex size-8 items-center justify-center rounded-l-sm border border-gray-300 text-black ', {
          'cursor-not-allowed text-gray-400': value === 1
        })}
        onClick={handleDecrease}
      >
        <IoMdRemove />
      </button>
      <InputNumber
        value={value || localValue}
        type="text"
        classNameInput="h-8 w-14 border border-x-0 border-gray-300 flex items-center justify-center outline-none text-center focus:shadow-sm"
        classNameError="hidden"
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />
      <button
        className={clsx('flex size-8 items-center justify-center rounded-l-sm border border-gray-300 text-black ', {
          'cursor-not-allowed text-gray-400': value === max
        })}
        onClick={handleIncrease}
      >
        <IoMdAdd />
      </button>
    </div>
  )
}
export default QuantityController
