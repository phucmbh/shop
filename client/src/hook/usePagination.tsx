interface Props {
  page: number
  pageSize: number
}

const usePagination = ({ page = 1, pageSize }: Props) => {
  const RANGE = 2

  let dotAfter = false
  let dotBefore = false
  const array: (string | number)[] = []

  const pageInLeftRange = () => {
    return page <= RANGE * 2 + 1
  }

  const pageInMiddleRange = () => {
    return page > RANGE * 2 + 1 && page < pageSize - RANGE * 2
  }

  const pageInRightRange = () => {
    return page >= pageSize - RANGE * 2
  }

  const addDotAfter = () => {
    if (!dotAfter) {
      dotAfter = true
      array.push('DOTS')
    }
  }

  const addDotBefore = () => {
    if (!dotBefore) {
      dotBefore = true
      array.push('DOTS')
    }
  }

  for (let pageNumber = 1; pageNumber <= pageSize; pageNumber++) {
    const showRightDots = () => {
      return pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1
    }

    const showLefttDots = () => {
      return pageNumber > RANGE && pageNumber < page - RANGE
    }
    // Điều kiện để return về ...
    if (pageInLeftRange() && showRightDots()) {
      addDotAfter()
      continue
    }
    if (pageInMiddleRange()) {
      if (showLefttDots()) {
        addDotBefore()
        continue
      } else if (showRightDots()) {
        addDotAfter()
        continue
      }
    }
    if (pageInRightRange() && showLefttDots()) {
      addDotBefore()
      continue
    }

    array.push(pageNumber)
  }

  return array
}

export default usePagination
