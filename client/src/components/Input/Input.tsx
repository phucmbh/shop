import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register: UseFormRegister<T>
  rules?: RegisterOptions<T, Path<T>>
  name?: Path<T>
}

const Input = <T extends FieldValues>({
  type,
  errorMessage,
  placeholder,
  name,
  register,
  rules,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-5 text-sm text-red-600'
}: InputProps<T>) => {
  const registerResult = name ? register(name, rules) : {}
  return (
    <div className="mt-3">
      <input type={type} className={classNameInput} autoComplete="on" placeholder={placeholder} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
export default Input
