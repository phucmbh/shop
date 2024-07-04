import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'

import { Banner, Button, InputText } from '@/components'
import { isAxiosUnprocessableEntityError } from '@/utils/util'
import { ErrorResponse } from '@/@types/utils.type'
import { RegisterForm, RegisterSchema } from '@/utils/validate'
import { apiRegister } from '@/apis'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'
import path from '@/constants/path'

type RegisterData = {
  email: string
  password: string
}

const Register = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
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
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<RegisterData>>(error)) {
          const formError = error.response?.data.data
          if (formError)
            Object.keys(formError).forEach((key) =>
              setError(key as keyof RegisterData, {
                message: formError[key as keyof RegisterData],
                type: 'server'
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
          <Button
            className="flex w-full items-center justify-center gap-2 bg-orange px-2 py-4  text-sm uppercase text-white hover:bg-orange/85"
            isLoading={registerMutation.isPending}
            disabled={registerMutation.isPending}
          >
            Đăng kí
          </Button>
        </div>

        <div className="mt-5 text-center">
          <span className="text-gray-400">Bạn đã có tài khoản? </span>
          <Link to={path.LOGIN} className="text-orange">
            Đăng nhập
          </Link>
        </div>
      </form>
    </Banner>
  )
}
export default Register
