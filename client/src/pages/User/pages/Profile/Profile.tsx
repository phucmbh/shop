import { ApiUser } from '@/apis/user.api'
import { Button, Input, InputFile, InputNumber } from '@/components'
import { userSchema, UserSchemaType } from '@/utils/validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DateSelect } from '../../components'
import { toast } from 'react-toastify'
import { AppContext } from '@/context/app.context'
import LocalStorage from '@/utils/auth'
import { getUrlAvatar, isAxiosUnprocessableEntityError } from '@/utils/util'
import { ErrorResponse } from '@/@types'

type FormData = Pick<UserSchemaType, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FromError = Omit<FormData, 'date_of_birth'> & { date_of_birth: string }
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

const Profile = () => {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      date_of_birth: new Date(1970, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData, refetch } = useQuery({ queryKey: ['profile'], queryFn: ApiUser.getProfile })

  const profile = profileData?.data.data
  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1970, 0, 1))
    }
  }, [profile, setValue])

  const updateProfileMutation = useMutation({ mutationFn: ApiUser.updateProfile })

  const uploadAvatarMutation = useMutation({ mutationFn: ApiUser.uploadAvatar })

  const handleChangeFile = (file: File) => {
    setFile(file)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      LocalStorage.setProfile(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FromError>>(error)) {
        const formError = error.response?.data.data
        if (formError)
          Object.keys(formError).forEach((key) =>
            setError(key as keyof FromError, {
              message: formError[key as keyof FromError],
              type: 'server'
            })
          )
      }
    }
  })

  return (
    <div className=" rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
      <div className="border-b border-b-gray-300 pb-6">
        <h1 className="text-lg capitalize">Hồ sơ của tôi</h1>
        <p className="mt-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
        <div className="mt-6 grow md:mt-0 md:pr-12">
          <div className="flex flex-wrap">
            <div className="w-full pt-3 text-left capitalize md:w-1/5 md:text-right">Email</div>
            <div className="w-full md:w-4/5 md:pl-5 ">
              <div className="pt-3 text-gray-700">{profile?.email}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap  ">
            <div className=" w-full pt-3 text-left capitalize md:w-1/5 md:text-right">Tên</div>
            <div className="w-full  md:w-4/5  md:pl-5">
              <Input
                name="name"
                placeholder="Tên"
                register={register}
                errorMessage={errors.name?.message}
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap  ">
            <div className="w-full pt-3 text-left capitalize md:w-1/5 md:text-right">Số điện thoại</div>
            <div className="w-full md:w-4/5 md:pl-5 ">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => {
                  return (
                    <InputNumber
                      type="phone"
                      errorMessage={errors.phone?.message}
                      classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                      {...field}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap  ">
            <div className="w-full pt-3 text-left capitalize md:w-1/5 md:text-right">Địa chỉ</div>
            <div className="w-full md:w-4/5 md:pl-5  ">
              <Input
                name="address"
                register={register}
                errorMessage={errors.address?.message}
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => {
              return (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )
            }}
          />

          <div className="mt-6 flex">
            <div className="md:w-1/5"></div>
            <div className="md:w-4/5 md:pl-5 ">
              <Button className="bg-orange hover:bg-orange/90 rounded-sm px-4 py-1 text-white ">Lưu</Button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center  justify-center md:w-72 md:border-l md:border-l-gray-200 ">
          <div className="mx-5 flex flex-col items-center justify-center gap-4">
            <div className="size-24 overflow-hidden rounded-full">
              <img src={previewImage || getUrlAvatar(avatar)} className="size-full object-cover" />
            </div>

            <InputFile onChange={handleChangeFile} />
            <div className="text-center text-gray-500">Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG, .JPG</div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Profile
