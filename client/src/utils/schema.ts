import * as yup from 'yup'

export const registerSchema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Sai định dạng email')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không đúng')
})

export const loginSchema = registerSchema.omit(['confirm_password'])

export type registerSchema = yup.InferType<typeof registerSchema>
export type loginSchema = yup.InferType<typeof loginSchema>
