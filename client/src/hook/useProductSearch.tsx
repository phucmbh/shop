import { useForm } from 'react-hook-form'
import useProductQueryConfig from './useProductQueryConfig'
import { searchSchema, SearchSchemaType } from '@/utils/validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PATH, SORT_BY } from '@/constants'
import { omit } from 'lodash'

const useProductSearch = () => {
  const navigate = useNavigate()
  const productQueryConfig = useProductQueryConfig()
  const { register, handleSubmit } = useForm<SearchSchemaType>({
    resolver: yupResolver(searchSchema)
  })

  const isSortByPrice = () => productQueryConfig.sort_by === SORT_BY.PRICE

  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams(
        omit({ ...productQueryConfig, name: data.search }, isSortByPrice() ? ['sort_by', 'order'] : ['order'])
      ).toString()
    })
  })

  return { register, onSubmitSearch }
}
export default useProductSearch
