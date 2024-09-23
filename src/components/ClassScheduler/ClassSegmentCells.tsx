import { times } from '@/components/ClassScheduler/static/times'

const ClassSegmentCells = ({ block }: { block: number }) => {
  return (
    <>
      <td className="border-2 border-black p-2" valign="middle" align="center">
        {block}
      </td>
      <td
        className="border-2 border-black p-2 w-[120px]"
        valign="middle"
        align="center"
      >
        {times[block].start} - {times[block].end}
      </td>
    </>
  )
}

export default ClassSegmentCells
