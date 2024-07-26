import { ProductQueryConfig } from '@/@types'
import { PATH } from '@/constants'
import { useTranslation } from 'react-i18next'
import { GoStar, GoStarFill } from 'react-icons/go'
import { createSearchParams, useNavigate } from 'react-router-dom'

interface Props {
  queryConfig: ProductQueryConfig
}
const RatingFilter = ({ queryConfig }: Props) => {
  const {t} = useTranslation('home')
  const navigate = useNavigate()

  const handleFilterStar = (rating: number) => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams({ ...queryConfig, rating_filter: String(rating) }).toString()
    })
  }

  return (
    <div className="my-4  ">
      <span className="text-base  ">{t('review')}</span>
      <ul className="my-3">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <li key={index} className="cursor-pointer py-1 pl-2" onClick={() => handleFilterStar(5 - index)}>
              <div className="flex items-center gap-1 text-lg">
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => {
                    if (indexStar < 5 - index)
                      return (
                        <div key={indexStar} className="relative">
                          <GoStarFill fill="#ffca11" size={15} />
                          <GoStar fill="#ffad27" size={15} className="absolute top-0" />
                        </div>
                      )
                    return <GoStar key={indexStar} size={15} fill="#ffca11" />
                  })}
                {index !== 0 && <span className="ml-1 text-black">{t('or more')}</span>}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default RatingFilter
