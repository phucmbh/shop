import { PATH } from '@/constants'
import { FaRegStar, FaStar } from 'react-icons/fa6'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from '../ProductList'

interface Props {
  queryConfig: QueryConfig
}
const RatingFilter = ({ queryConfig }: Props) => {
  const navigate = useNavigate()

  const handleFilterStar = (rating: number) => {
    navigate({
      pathname: PATH.HOME,
      search: createSearchParams({ ...queryConfig, rating_filter: String(rating) }).toString()
    })
  }

  return (
    <div className="my-4  ">
      <span className="text-base  ">Đánh giá</span>
      <ul className="my-3">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <li key={index} className="cursor-pointer py-1 pl-2" onClick={() => handleFilterStar(5 - index)}>
              <div className="flex items-center gap-2 text-sm text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => {
                    if (indexStar < 5 - index) return <FaStar key={indexStar} />

                    return <FaRegStar key={indexStar} />
                  })}
                {index !== 0 && <span className="text-black">trở lên</span>}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default RatingFilter
