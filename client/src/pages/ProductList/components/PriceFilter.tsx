import { Button, InputNumber } from '@/components'
import { PATH } from '@/constants'
import { PriceSchema, PriceSchemaType } from '@/utils/validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { IoMdRemove } from 'react-icons/io'
import { ProductQueryConfig } from '@/@types'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: ProductQueryConfig
}

const PriceFilter = ({ queryConfig }: Props) => {
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger
  } = useForm<PriceSchemaType>({
    resolver: yupResolver(PriceSchema)
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })
  return (
    <form onSubmit={onSubmit} className="my-4 ">
      <div>{t('price range')}</div>
      <div className="mt-2 flex items-center ">
        <Controller
          control={control}
          name="price_min"
          render={({ field }) => {
            return (
              <InputNumber
                errorMessage={errors?.price_min?.message}
                type="text"
                placeholder={`₫ ${t('from')}`}
                classNameInput=" w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
                classNameError="hidden"
                {...field}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('price_max')
                }}
              />
            )
          }}
        />

        <div className="px-5 text-gray-500">
          <IoMdRemove />
        </div>

        <Controller
          control={control}
          name="price_max"
          render={({ field }) => (
            <InputNumber
              errorMessage={errors?.price_max?.message}
              type="text"
              placeholder={`₫ ${t('to')}`}
              classNameInput=" w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
              classNameError="hidden"
              onChange={(event) => {
                field.onChange(event)
                trigger('price_min')
              }}
              value={field.value}
              ref={field.ref}
            />
          )}
        />
      </div>
      <div className="text-orange my-1 min-h-5 text-center">{errors.price_min?.message}</div>
      <Button className="bg-orange hover:bg-orange/80 w-full p-2 uppercase text-white">{t('apply')}</Button>
    </form>
  )
}
export default PriceFilter
