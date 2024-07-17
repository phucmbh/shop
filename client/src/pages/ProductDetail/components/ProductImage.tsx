import { Product } from '@/@types'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

interface Props {
  product: Product
}

const ProductImage = ({ product }: Props) => {
  const [imageListIndex, setImageListIndex] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    if (product.images.length > 0) setActiveImage(product.images[0])
  }, [product])

  const imageList = useMemo(() => product.images.slice(...imageListIndex), [product, imageListIndex])

  const canClickPre = () => imageListIndex[0] > 0
  const canClickNext = () => imageListIndex[1] < product.images.length

  const prev = () => {
    console.log('previous')
    if (canClickPre()) {
      setImageListIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const next = () => {
    console.log('next')
    if (canClickNext()) {
      setImageListIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const chooseImage = (img: string) => {
    setActiveImage(img)
  }

  return (
    <div>
      <div className="relative w-full pt-[100%] shadow">
        <img src={activeImage} alt={product.name} className="absolute left-0 top-0 size-full bg-white object-cover" />
      </div>
      <div onClick={() => alert('uwu')}>kkk</div>
      <div className="relative mt-4 grid grid-cols-5 gap-2">
        <button
          onClick={prev}
          className={clsx('absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 text-white', {
            'bg-black/30 ': canClickPre(),
            'bg-black/10 cursor-not-allowed': !canClickPre()
          })}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>

        <button
          onClick={next}
          className={clsx('absolute right-0 top-1/2 z-10 h-8 w-5 -translate-y-1/2 text-white', {
            'bg-black/30 ': canClickNext(),
            'bg-black/10 cursor-not-allowed': !canClickNext()
          })}
        >
          <MdOutlineKeyboardArrowRight />
        </button>

        {imageList.map((img, index) => {
          const isActive = img === activeImage
          return (
            <div className=" relative size-full pt-[100%]" key={index} onMouseEnter={() => chooseImage(img)}>
              <img
                src={img}
                alt={product.name}
                className="absolute left-0 top-0 size-full cursor-pointer bg-white object-cover"
              />
              {isActive && <div className="border-orange z-1 absolute inset-0 size-full cursor-pointer border-2"></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default ProductImage
