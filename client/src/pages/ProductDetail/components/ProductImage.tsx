import { Product } from '@/@types'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri'

interface Props {
  product: Product
}

const ProductImage = ({ product }: Props) => {
  const [imageListIndex, setImageListIndex] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (product.images.length > 0) setActiveImage(product.images[0])
  }, [product])

  const imageList = useMemo(() => product.images.slice(...imageListIndex), [product, imageListIndex])

  const canClickPre = () => imageListIndex[0] > 0
  const canClickNext = () => imageListIndex[1] < product.images.length

  const prev = () => {
    if (canClickPre()) {
      setImageListIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const next = () => {
    if (canClickNext()) {
      setImageListIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const chooseImage = (img: string) => {
    setActiveImage(img)
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  return (
    <div>
      <div
        className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow"
        onMouseMove={handleZoom}
        onMouseLeave={handleRemoveZoom}
      >
        <img
          src={activeImage}
          alt={product.name}
          className="pointer-events-none absolute left-0 top-0 size-full  bg-white object-cover"
          ref={imageRef}
        />
      </div>
      <div className="relative mt-4 grid grid-cols-5 gap-2">
        <button
          onClick={prev}
          className={clsx('absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 text-white', {
            'bg-black/30 ': canClickPre(),
            'bg-black/10 cursor-not-allowed': !canClickPre()
          })}
        >
          <RiArrowLeftWideLine size={20} />
        </button>

        <button
          onClick={next}
          className={clsx('absolute right-0 top-1/2 z-10 h-8 w-5 -translate-y-1/2 text-white', {
            'bg-black/30 ': canClickNext(),
            'bg-black/10 cursor-not-allowed': !canClickNext()
          })}
        >
          <RiArrowRightWideLine size={20} />
        </button>

        {imageList.map((img, index) => {
          const isActive = img === activeImage
          return (
            <div className=" relative size-full pt-[100%] " key={index} onMouseEnter={() => chooseImage(img)}>
              <img
                src={img}
                alt={product.name}
                className="absolute left-0 top-0 size-full cursor-pointer bg-white object-cover"
              />
              {isActive && <div className="z-1 absolute inset-0 size-full cursor-pointer border-2 border-orange"></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default ProductImage
