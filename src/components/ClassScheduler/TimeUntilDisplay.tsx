import { useEffect, useState } from 'react'

const TimeUntilDisplay = ({
  timeUntilString,
  inClassNow,
}: {
  timeUntilString: string
  inClassNow: boolean
}) => {
  const [string, setString] = useState<string | undefined>()
  useEffect(() => {
    setString(timeUntilString)
  }, [timeUntilString])
  return (
    <div className="text-left text-theme-heading-xs inline-block w-[180px]">
      <div className="relative pr-6">{string}</div>
      <figure className="text-theme-md">
        {inClassNow ? 'until next break' : 'until next class'}
      </figure>
    </div>
  )
}

export default TimeUntilDisplay
