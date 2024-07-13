import { FaStar } from 'react-icons/fa6'

type Props = {
  rating: number
}

const Rating = ({ rating }: Props) => {
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
            <FaStar className="text-yellow-400" />
          </div>
          <FaStar className="text-gray-300" />
        </div>
      ))}
    </div>
  )
}
export default Rating
