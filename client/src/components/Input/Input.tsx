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
  errorMessage,
  name,
  register,
  rules,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-5 text-sm text-red-600',
  ...rest
}: InputProps<T>) => {
  const registerResult = name ? register(name, rules) : null
  return (
    <div className="mt-3">
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
export default Input
