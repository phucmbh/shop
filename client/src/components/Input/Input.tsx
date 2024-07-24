import { useState } from 'react'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  classNameInput?: string
  classNameError?: string
  register: UseFormRegister<T>
  rules?: RegisterOptions<T, Path<T>>
  name?: Path<T>
  type?: string
}

const Input = <T extends FieldValues>({
  errorMessage,
  name,
  register,
  rules,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-5 text-sm text-red-600',
  className = '',
  type,
  ...rest
}: InputProps<T>) => {
  const registerResult = name ? register(name, rules) : null
  const [openEye, setOpenEye] = useState<boolean>(false)
  const handleOnClick = () => {
    setOpenEye(!openEye)
  }
  return (
    <div className={className}>
      <div className="relative">
        <input
          className={classNameInput}
          {...registerResult}
          {...rest}
          type={type === 'password' && !openEye ? 'password' : 'text'}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {type === 'password' && (
            <>
              {openEye ? (
                <FaRegEye size={20} onClick={handleOnClick} className="cursor-pointer" />
              ) : (
                <FaRegEyeSlash size={20} onClick={handleOnClick} className="cursor-pointer" />
              )}
            </>
          )}
        </div>
      </div>
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
export default Input
