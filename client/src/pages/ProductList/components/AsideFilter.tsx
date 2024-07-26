import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'

import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { MdArrowRight, CiFilter, FaList } from '@/utils/icons'
import omit from 'lodash/omit'

import { Button } from '@/components'
import { PATH } from '@/constants'
import { ApiCategory } from '@/apis/category.api'
import RatingFilter from './RatingFilter'
import PriceFilter from './PriceFilter'
import { ProductQueryConfig } from '@/@types'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: ProductQueryConfig
}

const AsideFilter = ({ queryConfig }: Props) => {
  const navigate = useNavigate()
  const { t } = useTranslation(['home'])
  const { category } = queryConfig

  const handleRemoveAllFilters = () => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams(omit(queryConfig, ['rating_filter', 'price_min', 'price_max', 'category'])).toString()
    })
  }

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => ApiCategory.getCategories()
  })
  return (
    <aside className="text-sm">
      <Link
        to={PATH.HOME}
        className={clsx('flex items-center gap-3   py-4 text-black', {
          'text-orange': !category
        })}
      >
        <FaList size={20} />
        <span className="text-base font-bold capitalize">{t('all categories')}</span>
      </Link>
      {categoriesData && (
        <ul className="">
          {categoriesData.data.data.map((categoryItem) => {
            const isActive = categoryItem._id === category
            return (
              <li
                key={categoryItem._id}
                className={clsx('mb-2 flex items-center gap-2', {
                  'text-orange': isActive
                })}
              >
                <Link
                  to={{
                    pathname: PATH.HOME,
                    search: createSearchParams({ ...queryConfig, category: categoryItem._id }).toString()
                  }}
                  className="relative ml-4"
                >
                  {isActive && <MdArrowRight size={15} className="absolute left-[-20px] top-[2px] " />}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      <div className="my-4 flex items-center  gap-3 text-black">
        <CiFilter size={20} />
        <span className="text-base font-bold uppercase">{t('search filter')}</span>
      </div>

      <PriceFilter queryConfig={queryConfig} />
      <div className="my-4 h-px border border-gray-300"></div>
      <RatingFilter queryConfig={queryConfig} />
      <div className="my-4 h-px border border-gray-300"></div>
      <Button
        onClick={handleRemoveAllFilters}
        className="bg-orange hover:bg-orange/80 w-full p-2 uppercase text-white "
      >
        {t('clear all')}
      </Button>
    </aside>
  )
}
export default AsideFilter
