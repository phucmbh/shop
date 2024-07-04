import { HTMLInputTypeAttribute } from 'react'
import { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props<TFieldValues extends FieldValues> {
  type: HTMLInputTypeAttribute
  name: FieldPath<TFieldValues>
  placehoder?: string
  errorMessage?: string
  register: UseFormRegister<TFieldValues>
  rules?: RegisterOptions
}

const InputText = <TFieldValues extends FieldValues>({
  type,
  errorMessage,
  placehoder,
  name,
  register
}: Props<TFieldValues>) => {
  return (
    <div className="mt-3">
      <input
        type={type}
        className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
        autoComplete="on"
        placeholder={placehoder}
        {...register(name)}
      />
      <div className="mt-1 min-h-5 text-sm text-red-600">{errorMessage}</div>
    </div>
  )
}
export default InputText
