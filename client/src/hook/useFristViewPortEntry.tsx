import { MutableRefObject, useEffect, useRef, useState } from 'react'

const useFristViewPortEntry = (
  ref: MutableRefObject<HTMLDivElement | null>,
  observerOptions: IntersectionObserverInit
) => {
  const [entered, setEntered] = useState(false)
  const observer = useRef(new IntersectionObserver(([entry]) => setEntered(entry.isIntersecting), observerOptions))

  useEffect(() => {
    const element = ref.current
    const ob = observer.current

    if (entered) {
      ob.disconnect()
      return
    }

    if (element && !entered) ob.observe(element)

    return () => ob.disconnect()
  }, [entered, ref])

  return entered
}
export default useFristViewPortEntry
