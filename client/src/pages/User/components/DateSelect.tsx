import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
  classNameError?: string
  errorMessage?: string
  onChange?: (value: Date) => void
  value?: Date
}

const DateSelect = ({ value, onChange, errorMessage, classNameError = 'mt-1 min-h-5 text-sm text-red-600' }: Props) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: value
    }

    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className="mt-2 flex flex-wrap md:flex-nowrap  ">
      <div className="w-full pt-3 text-left capitalize md:w-1/5 md:min-w-[150px] md:text-right">Ngày sinh</div>
      <div className="w-full md:w-4/5 md:pl-5  ">
        <div className="flex justify-between">
          <select
            name="date"
            onChange={handleChange}
            value={value?.getDate() || date.date}
            className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 hover:border-orange"
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="month"
            value={value?.getMonth() || date.month}
            onChange={handleChange}
            className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 hover:border-orange"
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name="year"
            value={value?.getFullYear() || date.year}
            onChange={handleChange}
            className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 hover:border-orange"
          >
            <option disabled>Năm</option>
            {range(1990, 2025).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={classNameError}>{errorMessage}</div>
      </div>
    </div>
  )
}
export default DateSelect
