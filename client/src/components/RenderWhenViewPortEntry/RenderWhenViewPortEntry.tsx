import useFristViewPortEntry from '@/hook/useFristViewPortEntry'
import { HTMLAttributes, Suspense, useRef } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  threshold?: number
  root?: null
  rootMargin?: string
}

const RenderWhenViewPortEntry = ({
  children,
  threshold = 0,
  root = null,
  rootMargin = '0px 0px 0px 0px ',
  ...rest
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entered = useFristViewPortEntry(ref, { threshold, root, rootMargin })

  return (
    <div {...rest} ref={ref}>
      {entered && <Suspense fallback={<div>loading</div>}>{children}</Suspense>}
    </div>
  )
}
export default RenderWhenViewPortEntry
