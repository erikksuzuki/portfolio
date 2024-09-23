import { useEffect, useState } from 'react'
import { monthNames } from '@/components/ClassScheduler/static/monthNames'
import { type TimeObject } from '@/components/ClassScheduler/types/TimeObject'

const DateDisplay = ({ time }: { time: TimeObject }) => {
  const [dateString, setDateString] = useState<string>('')
  useEffect(() => {
    setDateString(
      `${time.dayofweek}, ${monthNames[time.month - 1]} ${time.day}`
    )
  }, [time])
  return <div>{dateString}</div>
}

export default DateDisplay
