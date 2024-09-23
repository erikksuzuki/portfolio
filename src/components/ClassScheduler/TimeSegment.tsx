import { daysOfTheWeek } from '@/components/ClassScheduler/static/daysOfTheWeek'
import { schedule } from '@/components/ClassScheduler/static/schedule'

const TimeSegment = ({ block, day }: { block: number; day: number }) => {
  if (schedule[daysOfTheWeek[day + 1]][block - 1] === '.' ? '' : 'class') {
    return <div className="w-full h-full bg-[rgba(255,255,255,0.4)]">-</div>
  } else {
    return <div></div>
  }
}

export default TimeSegment
