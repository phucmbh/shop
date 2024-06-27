import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { InputText } from '@/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '@/utils/schema'
import Banner from '@/components/Banner'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<registerSchema>({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = handleSubmit((data: registerSchema) => console.log(data))

  return (
    <Banner>
      <form className='rounded bg-white p-[30px] shadow-sm' onSubmit={onSubmit} noValidate>
        <div className='text-2xl'>Đăng kí</div>

        <InputText name='email' register={register} type='email' errorMessage={errors.email?.message} />
        <InputText name='password' register={register} type='password' errorMessage={errors.password?.message} />
        <InputText
          name='confirm_password'
          register={register}
          type='password'
          errorMessage={errors.confirm_password?.message}
        />

        <div className='mt-3'>
          <button className='w-full bg-orange px-2 py-4 text-center text-sm uppercase text-white hover:bg-orange/85'>
            Đăng kí
          </button>
        </div>

        <div className='mt-5 text-center'>
          <span className='text-gray-400'>Bạn đã có tài khoản? </span>
          <Link to='/login' className='text-orange'>
            Đăng nhập
          </Link>
        </div>
      </form>
    </Banner>
  )
}
export default Register
