import { ErrorResponse } from '@/@types'
import { ApiUser } from '@/apis/user.api'
import { Button, Input } from '@/components'
import { isAxiosUnprocessableEntityError } from '@/utils/util'
import { userSchema, UserSchemaType } from '@/utils/validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ChangePassword = () => {
  type FormData = Pick<UserSchemaType, 'password' | 'new_password' | 'confirm_password'>
  const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

  const updateProfileMutation = useMutation({ mutationFn: ApiUser.updateProfile })
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(passwordSchema)
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError)
          Object.keys(formError).forEach((key) =>
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'server'
            })
          )
      }
    }
  })
  return (
    <div className=" rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
      <div className="border-b border-b-gray-300 pb-6 ">
        <h1 className="text-lg capitalize">Đổi mật khẩu</h1>
        <p className="mt-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col-reverse md:flex-row md:items-start">
        <div className="  md:mt-0 md:w-[600px] md:pr-12">
          <div className="mt-6 flex flex-wrap  md:flex-nowrap">
            <div className=" w-full pt-3 text-left capitalize md:w-1/5 md:min-w-[150px] md:text-right">Mật khẩu</div>
            <div className="w-full  md:w-4/5  md:pl-5">
              <Input
                name="password"
                type="password"
                register={register}
                errorMessage={errors.password?.message}
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>

          <div className="mt-2 flex flex-wrap md:flex-nowrap ">
            <div className="w-full pt-3 text-left capitalize md:w-1/5 md:min-w-[150px] md:text-right">Mật khẩu mới</div>
            <div className="w-full md:w-4/5 md:pl-5  ">
              <Input
                name="new_password"
                type="password"
                register={register}
                errorMessage={errors.new_password?.message}
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>

          <div className="mt-2 flex flex-wrap md:flex-nowrap ">
            <div className="w-full pt-3 text-left capitalize md:w-1/5 md:min-w-[150px] md:text-right">
              Nhập lại mật khẩu
            </div>
            <div className="w-full  md:pl-5  ">
              <Input
                name="confirm_password"
                type="password"
                register={register}
                errorMessage={errors.confirm_password?.message}
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
              <Button className="rounded-sm bg-orange px-4 py-1 text-white hover:bg-orange/90 ">Lưu</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default ChangePassword
