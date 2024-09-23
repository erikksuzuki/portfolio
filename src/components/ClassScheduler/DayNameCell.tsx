import clsx from 'clsx'
import { TimeObject } from '@/components/ClassScheduler/types/TimeObject'
import DayProgressColumnDisplay from '@/components/ClassScheduler/DayProgressColumnDisplay'

interface DayNameCellProps {
  time: TimeObject
  day: string
  fn: any
}

const DayNameCell = ({ time, day, fn }: DayNameCellProps) => {
  return (
    <th
      align="center"
      className={clsx('data-mon border-2 border-black p-2 relative', {
        'bg-[rgba(0,0,0,0.4)]': time.dayofweek === day,
      })}
    >
      {time.dayofweek === day ? (
        <DayProgressColumnDisplay
          progressPercent={fn().dayProgress}
          isSchoolHours={fn().isSchoolHours}
        />
      ) : (
        <div />
      )}
      {day.slice(0, 3)}
    </th>
  )
}

export default DayNameCell
