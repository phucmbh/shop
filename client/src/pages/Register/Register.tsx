import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { omit } from "lodash"

import { Banner, InputText } from "@/components"
import { isAxiosUnprocessableEntityError } from "@/utils/util"
import { ApiResponse } from "@/@types/utils.type"
import { RegisterForm, RegisterSchema } from "@/utils/validate"
import { apiRegister } from "@/apis"

type RegisterData = {
  email: string
  password: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegisterForm>({
    resolver: yupResolver(RegisterSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: RegisterData) => apiRegister(body)
  })

  const onSubmit = handleSubmit((data: RegisterForm) => {
    const body = omit(data, ["confirm_password"])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ApiResponse<RegisterData>>(error)) {
          const formError = error.response?.data.data
          if (formError)
            Object.keys(formError).forEach((key) =>
              setError(key as keyof RegisterData, {
                message: formError[key as keyof RegisterData],
                type: "server"
              })
            )
        }
      }
    })
  })

  return (
    <Banner>
      <form className="rounded bg-white p-[30px] shadow-sm" onSubmit={onSubmit} noValidate>
        <div className="text-2xl">Đăng kí</div>

        <InputText name="email" register={register} type="email" errorMessage={errors.email?.message} />
        <InputText name="password" register={register} type="password" errorMessage={errors.password?.message} />
        <InputText
          name="confirm_password"
          register={register}
          type="password"
          errorMessage={errors.confirm_password?.message}
        />

        <div className="mt-3">
          <button className="bg-orange hover:bg-orange/85 w-full px-2 py-4 text-center text-sm uppercase text-white">
            Đăng kí
          </button>
        </div>

        <div className="mt-5 text-center">
          <span className="text-gray-400">Bạn đã có tài khoản? </span>
          <Link to="/login" className="text-orange">
            Đăng nhập
          </Link>
        </div>
      </form>
    </Banner>
  )
}
export default Register
