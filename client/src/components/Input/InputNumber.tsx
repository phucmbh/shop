import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-5 text-sm text-red-600',

    onChange,
    ...rest
  },
  ref
) {
  //Must set default value for price_min and price_max in useForm
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (Number(value) || value === '') {
      console.log(value)
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
