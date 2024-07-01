import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"

import { Banner, InputText } from "@/components"
import { LoginForm, LoginSchema } from "@/utils/validate"
import { apiLogin } from "@/apis"
import { isAxiosUnprocessableEntityError } from "@/utils/util"
import { ApiResponse } from "@/@types/utils.type"

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: LoginForm) => apiLogin(body)
  })

  const onSubmit = handleSubmit((data: LoginForm) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ApiResponse<LoginForm>>(error)) {
          const formError = error.response?.data.data
          if (formError)
            Object.keys(formError).forEach((key) =>
              setError(key as keyof LoginForm, {
                message: formError[key as keyof LoginForm],
                type: "server"
              })
            )
        }
      }
    })
  })
  return (
    <Banner>
      <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
        <div className="text-2xl">Đăng nhập</div>

        <InputText
          type="email"
          name="email"
          register={register}
          errorMessage={errors.email?.message}
          placehoder="Email"
        />

        <InputText
          type="password"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
          placehoder="Password"
        />

        <div className="mt-3">
          <button className="bg-orange hover:bg-orange/85 w-full px-2 py-4 text-center text-sm uppercase text-white">
            Đăng nhập
          </button>
        </div>

        <div className="mt-5 text-center">
          <span className="text-gray-400">Bạn mới biết đên shopee? </span>
          <Link to="/register" className="text-orange">
            Đăng kí
          </Link>
        </div>
      </form>
    </Banner>
  )
}
export default Login
