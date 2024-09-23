import clsx from 'clsx'

const DayProgressColumnDisplay = ({
  progressPercent,
  isSchoolHours,
}: {
  progressPercent: number
  isSchoolHours: boolean
}) => {
  return (
    <div className="w-full left-0 h-[478px] absolute top-[42px]">
      <div
        style={{
          height: `${progressPercent * 478}px`,
        }}
        className={clsx('absolute w-full left-0 top-0', {
          'border-b-2 border-[#fff]': isSchoolHours,
        })}
      />
    </div>
  )
}

export default DayProgressColumnDisplay
