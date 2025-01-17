import * as Yup from 'yup'

export const LoginSchema = Yup.object({
  email: Yup.string()
    .required('Email là bắt buộc')
    .email('Sai định dạng email')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự'),
  password: Yup.string()
    .required('Password là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 -160 kí tự')
})

export type LoginSchemaType = Yup.InferType<typeof LoginSchema>
