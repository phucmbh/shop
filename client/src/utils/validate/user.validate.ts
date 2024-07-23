import * as Yup from 'yup'

const today = new Date()

export const userSchema = Yup.object({
  name: Yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  date_of_birth: Yup.date()

    .max(today, 'Ngày sinh không hợp lệ'),
  address: Yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: Yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
  avatar: Yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  password: Yup.string().min(5, 'Độ dài từ 5 - 160 kí tự').max(160, 'Độ dài từ 5 -160 kí tự'),
  new_password: Yup.string().min(5, 'Độ dài từ 5 - 160 kí tự').max(160, 'Độ dài từ 5 -160 kí tự'),
  confirm_password: Yup.string()
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự')
    .oneOf([Yup.ref('new_password')], 'Nhập lại password không đúng')
})

export type UserSchemaType = Yup.InferType<typeof userSchema>
