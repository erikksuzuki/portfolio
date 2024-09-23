import { useEffect, useState } from 'react'
import { type TimeObject } from '@/components/ClassScheduler/types/TimeObject'

const ClockDisplay = ({ time }: { time: TimeObject }) => {
  const [timeString, setTimeString] = useState<TimeObject>()
  useEffect(() => {
    setTimeString(time)
  }, [time])
  return (
    <div className="text-right text-theme-heading-sm inline-block w-[108px]">
      <div className="relative pr-6">
        <figure className="absolute top-[2px] right-[0px] text-theme-xs">
          {timeString?.ampm}
        </figure>
        {timeString?.hour.toString().length === 2
          ? timeString.hour
          : '0' + timeString?.hour}
        :{timeString?.minute}{' '}
        <figure className="absolute bottom-[4px] right-[0px] text-theme-sm">
          {timeString?.second}
        </figure>
      </div>
    </div>
  )
}

export default ClockDisplay
