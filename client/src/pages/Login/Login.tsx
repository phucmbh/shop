import { Link } from 'react-router-dom'
import { InputText } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/utils/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Banner from '@/components/Banner'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginSchema>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit((data: loginSchema) => console.log(data))
  return (
    <Banner>
      <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
        <div className='text-2xl'>Đăng nhập</div>

        <InputText
          type='email'
          name='email'
          register={register}
          errorMessage={errors.email?.message}
          placehoder='Email'
        />

        <InputText
          type='password'
          name='password'
          register={register}
          errorMessage={errors.password?.message}
          placehoder='Password'
        />

        <div className='mt-3'>
          <button className='w-full bg-orange px-2 py-4 text-center text-sm uppercase text-white hover:bg-orange/85'>
            Đăng nhập
          </button>
        </div>

        <div className='mt-5 text-center'>
          <span className='text-gray-400'>Bạn mới biết đên shopee? </span>
          <Link to='/register' className='text-orange'>
            Đăng kí
          </Link>
        </div>
      </form>
    </Banner>
  )
}
export default Login
