import * as Yup from 'yup'

export const searchSchema = Yup.object({
  search: Yup.string().trim().required('Search is required')
})

export type SearchSchemaType = Yup.InferType<typeof searchSchema>
