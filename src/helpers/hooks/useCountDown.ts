import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export default function useCountDown({
  endTime = 0,
  step = 1,
  format = 'HH:mm:ss',
}: {
  endTime?: number | undefined
  step?: number
  format?: string
}) {
  const [time, setTime] = useState(endTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - step : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTime, step])

  return { time, formatted: dayjs({ seconds: time }).format(format) }
}
