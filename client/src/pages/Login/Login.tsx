import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { Banner, Button, Input } from '@/components'
import { LoginSchemaType, LoginSchema } from '@/utils/validate'
import { ApiAuth } from '@/apis'
import { isAxiosUnprocessableEntityError } from '@/utils/util'
import { ErrorResponse } from '@/@types/utils.type'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'
import { PATH } from '@/constants'

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: LoginSchemaType) => ApiAuth.login(body)
  })

  const onSubmit = handleSubmit((data: LoginSchemaType) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchemaType>>(error)) {
          const formError = error.response?.data.data
          if (formError)
            Object.keys(formError).forEach((key) =>
              setError(key as keyof LoginSchemaType, {
                message: formError[key as keyof LoginSchemaType],
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
        <div className="mb-5 text-2xl ">Đăng nhập</div>

        <Input type="email" name="email" register={register} errorMessage={errors.email?.message} placeholder="Email" />

        <Input
          type="password"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
          placeholder="Password"
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
          <Link to={PATH.REGISTER} className="text-orange">
            Đăng kí
          </Link>
        </div>
      </form>
    </Banner>
  )
}
export default Login
