import { daysOfTheWeek } from '@/components/ClassScheduler/static/daysOfTheWeek'
import TimeSegment from '@/components/ClassScheduler/TimeSegment'
import clsx from 'clsx'

import { type ClassTableCellProps } from '@/components/ClassScheduler/types/ClassTableCellProps'

const ClassTableCell = ({ time, block, day }: ClassTableCellProps) => {
  return (
    <td
      className={clsx('data-mon border-2 border-black p-2', {
        'bg-[rgba(0,0,0,0.4)]': time.dayofweek === daysOfTheWeek[day],
      })}
      valign="middle"
      align="center"
    >
      <TimeSegment block={block} day={day - 1} />
    </td>
  )
}

export default ClassTableCell
