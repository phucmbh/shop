import { HTMLInputTypeAttribute } from "react"
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form"

interface Props<> {
  type: HTMLInputTypeAttribute
  name: string
  placehoder?: string
  errorMessage?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}

const InputText = ({ type, errorMessage, placehoder, name, register }: Props) => {
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
