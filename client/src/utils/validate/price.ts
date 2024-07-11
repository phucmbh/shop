import * as Yup from 'yup'

export const PriceSchema = Yup.object({
  from: Yup.number(),
  to: Yup.number()
})

export type PriceForm = Yup.InferType<typeof PriceSchema>
