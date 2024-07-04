import * as Yup from 'yup'

export const RegisterSchema = Yup.object({
  email: Yup.string()
    .required('Email là bắt buộc')
    .email('Sai định dạng email')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự'),
  password: Yup.string()
    .required('Password là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự'),
  confirm_password: Yup.string()
    .required('Nhập lại password là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự')
    .oneOf([Yup.ref('password')], 'Nhập lại password không đúng')
})

export type RegisterForm = Yup.InferType<typeof RegisterSchema>
