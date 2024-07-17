import { IoMdStar } from 'react-icons/io'

type Props = {
  rating: number
  activeClassName?: string
  noneActiveClassName?: string
}

const Rating = ({ rating, activeClassName = 'text-yellow-400', noneActiveClassName = 'text-gray-300' }: Props) => {
  function ratingToRatingPercentList(rating: number) {
    const ratingPercents = []
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) ratingPercents.push('100%')
      if (rating < i) {
        if (i - rating < 1) ratingPercents.push(`${(rating - Math.floor(rating)) * 100}%`)
        else ratingPercents.push('0%')
      }
    }

    return ratingPercents
  }

  return (
    <div className="flex items-center text-gray-200 ">
      {ratingToRatingPercentList(rating).map((percent, index) => (
        <div className="relative" key={index}>
          <div className="absolute top-0 size-full overflow-hidden" style={{ width: percent }}>
            <IoMdStar className={activeClassName} />
          </div>
          <IoMdStar className={noneActiveClassName} />
        </div>
      ))}
    </div>
  )
}
export default Rating
