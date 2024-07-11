import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { Banner, Button, Input } from '@/components'
import { LoginForm, LoginSchema } from '@/utils/validate'
import { apiLogin } from '@/apis'
import { isAxiosUnprocessableEntityError } from '@/utils/util'
import { ErrorResponse } from '@/@types/utils.type'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'
import path from '@/constants/path'

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
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
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginForm>>(error)) {
          const formError = error.response?.data.data
          if (formError)
            Object.keys(formError).forEach((key) =>
              setError(key as keyof LoginForm, {
                message: formError[key as keyof LoginForm],
                type: 'server'
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

        <Input type="email" name="email" register={register} errorMessage={errors.email?.message} placehoder="Email" />

        <Input
          type="password"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
          placehoder="Password"
        />

        <div className="mt-3">
          <Button
            className="bg-orange hover:bg-orange/85 flex w-full items-center  justify-center gap-2 px-2 py-4 text-sm uppercase text-white"
            isLoading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            Đăng nhập
          </Button>
        </div>

        <div className="mt-5 text-center">
          <span className="text-gray-400">Bạn mới biết đên shopee? </span>
          <Link to={path.REGISTER} className="text-orange">
            Đăng kí
          </Link>
        </div>
      </form>
    </Banner>
  )
}
export default Login
