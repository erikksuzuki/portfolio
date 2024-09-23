'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { monthNames } from '@/components/ClassScheduler/static/monthNames'
import { daysOfTheWeek } from '@/components/ClassScheduler/static/daysOfTheWeek'
import { times } from '@/components/ClassScheduler/static/times'
import { schedule } from '@/components/ClassScheduler/static/schedule'
import { getLocalDateString } from '@/utils/getLocalDateString'
import { formatAMPM } from '@/utils/formatDateTime'
import { formatMilliseconds } from '@/utils/formatMilliseconds'

import { type ClassTableCellProps } from '@/components/ClassScheduler/types/ClassTableCellProps'
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

const DateDisplay = ({ time }: { time: TimeObject }) => {
  const [dateString, setDateString] = useState<string>('')
  useEffect(() => {
    setDateString(
      `${time.dayofweek}, ${monthNames[time.month - 1]} ${time.day}`
    )
  }, [time])
  return <div>{dateString}</div>
}

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

const TimeSegment = ({ block, day }: { block: number; day: number }) => {
  if (schedule[daysOfTheWeek[day + 1]][block - 1] === '.' ? '' : 'class') {
    return <div className="w-full h-full bg-[rgba(255,255,255,0.4)]">-</div>
  } else {
    return <div></div>
  }
}

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

const BabysSchedulePage = () => {
  const initialTime = getLocalDateString('Asia/Phnom_Penh')
  const [timeNow, setTimeNowHere] = useState<Date>(new Date(initialTime))

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimeNowHere((prev) => new Date(new Date(prev).getTime() + 93750))
  //   }, 200)
  //   return () => clearInterval(intervalId)
  // }, [initialTime])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeNowHere(new Date(getLocalDateString('Asia/Phnom_Penh')))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [initialTime])

  const timeObject: TimeObject = {
    dayofweek: daysOfTheWeek[timeNow.getDay()],
    year: timeNow.getFullYear().toString(),
    month: timeNow.getMonth() + 1,
    day: timeNow.getDate(),
    time: `${timeNow.getHours()}:${
      timeNow.getMinutes().toString().length === 1
        ? `0${timeNow.getMinutes()}`
        : timeNow.getMinutes()
    }`,
    hour:
      // if the hour of the day is greater than 12 (example, 14 o' clock), then minus 12 from the hour
      timeNow.getHours() > 12 ? timeNow.getHours() - 12 : timeNow.getHours(),
    minute:
      // if the minute of the day is one digit (example 0 minutes or 1 minute), then add another 0 before
      timeNow.getMinutes().toString().length === 1
        ? `0${timeNow.getMinutes()}`
        : timeNow.getMinutes(),
    second:
      new Date().getSeconds().toString().length === 1
        ? `0${new Date().getSeconds()}`
        : new Date().getSeconds(),
    ampm: timeNow.getHours() > 12 ? 'PM' : 'AM',
  }

  function checkClassSlot(slotNumber: number) {
    if (
      timeNow.getTime() >=
        new Date(
          `${timeObject.year} ${timeObject.month} ${timeObject.day} ${times[slotNumber].start}`
        ).getTime() &&
      timeNow.getTime() <=
        new Date(
          `${timeObject.year} ${timeObject.month} ${timeObject.day} ${times[slotNumber].end}`
        ).getTime()
    ) {
      if (schedule[timeObject.dayofweek][slotNumber - 1] === '.') {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
  const inClassNow =
    !checkClassSlot(1) &&
    !checkClassSlot(2) &&
    !checkClassSlot(3) &&
    !checkClassSlot(4) &&
    !checkClassSlot(5) &&
    !checkClassSlot(6) &&
    !checkClassSlot(7) &&
    !checkClassSlot(8)
      ? false
      : true
  function calculateTimeBetween(): { label: string; timeUntil: string } {
    if (inClassNow) {
      let currentBlock = 1
      schedule[timeObject.dayofweek].forEach(
        (timeSlot: string, index: number) => {
          const nextSlotStart: Date = new Date(
            `${timeObject.year} ${timeObject.month} ${timeObject.day} ${
              times[index + 1].start
            }`
          )
          if (timeSlot === '.') return
          if (timeNow.getTime() < nextSlotStart.getTime()) return
          currentBlock = index + 1
        }
      )
      const targetTime = `${timeObject.year} ${timeObject.month} ${timeObject.day} ${times[currentBlock].end}`
      const timeUntilMiliseconds = Number(
        new Date(targetTime).getTime() - timeNow.getTime()
      )
      return {
        label: `Current class ends at ${formatAMPM(targetTime)}`,
        timeUntil:
          timeUntilMiliseconds < 0
            ? 'N/A'
            : formatMilliseconds(timeUntilMiliseconds, true),
      }
    } else {
      let currentBlock = 1
      let blockFound = false
      schedule[timeObject.dayofweek].forEach(
        (timeSlot: string, index: number) => {
          const thisBlockStart: Date = new Date(
            `${timeObject.year} ${timeObject.month} ${timeObject.day} ${
              times[index + 1].start
            }`
          )
          // if block is empty, skip
          if (timeSlot === '.') return
          if (thisBlockStart.getTime() < timeNow.getTime()) return
          if (blockFound) return
          blockFound = true
          currentBlock = index + 1
        }
      )
      const targetTime = `${timeObject.year} ${timeObject.month} ${timeObject.day} ${times[currentBlock].start}`
      const timeUntilMiliseconds = Number(
        new Date(targetTime).getTime() - timeNow.getTime()
      )
      return {
        label: `Next class starts at ${formatAMPM(targetTime)}`,
        timeUntil:
          timeUntilMiliseconds < 0
            ? 'N/A'
            : formatMilliseconds(timeUntilMiliseconds, true),
      }
    }
  }

  function getDayProgressPercent() {
    let isSchoolHours = false
    if (
      new Date(
        `${timeObject.month} ${timeObject.day} ${timeNow.getHours()}:${
          timeObject.minute
        }`
      ).getTime() <
        new Date(`${timeObject.month} ${timeObject.day} 7:20`).getTime() ||
      new Date(
        `${timeObject.month} ${timeObject.day} ${timeNow.getHours()}:${
          timeObject.minute
        }`
      ).getTime() >
        new Date(`${timeObject.month} ${timeObject.day} 16:10`).getTime()
    ) {
      isSchoolHours = false
    } else {
      isSchoolHours = true
    }

    let minutesIn = 0
    let totalAvailableMinutes = 530
    if (isSchoolHours) {
      minutesIn = (timeNow.getHours() - 7) * 60 + Number(timeObject.minute) - 20
    }
    return {
      isSchoolHours: isSchoolHours,
      dayProgress: Number(minutesIn / totalAvailableMinutes),
    }
  }

  return (
    <div>
      <section className="text-left gap-y-6 py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px] relative">
        <div className="w-full">
          <header className="flex flex-row justify-between">
            <div>
              <TimeUntilDisplay
                timeUntilString={calculateTimeBetween().timeUntil}
                inClassNow={inClassNow}
              />
            </div>
            <div className="text-right">
              <ClockDisplay time={timeObject} />
              <DateDisplay time={timeObject} />
            </div>
          </header>
          <div
            className={clsx(
              'text-theme-heading-sm w-full text-center',
              { 'text-[#0f0]': !inClassNow },
              { 'text-[red]': inClassNow }
            )}
          >
            {inClassNow
              ? 'Class in Session'
              : getDayProgressPercent().isSchoolHours &&
                timeObject.dayofweek !== 'Sunday'
              ? 'Not in Class'
              : 'Non-School Hours'}
          </div>
          <div className="w-full text-center mb-4">
            {calculateTimeBetween().label}
          </div>

          <div>
            <table className="w-full" width="100%">
              <thead className="bg-[rgba(255,255,255,0.1)]">
                <tr>
                  <th align="center" className="border-2 border-black p-2" />
                  <th align="center" className="border-2 border-black p-2">
                    #
                  </th>
                  <th
                    align="center"
                    className="w-[120px] border-2 border-black p-2"
                  >
                    Time
                  </th>
                  <DayNameCell
                    time={timeObject}
                    day="Monday"
                    fn={getDayProgressPercent}
                  />
                  <DayNameCell
                    time={timeObject}
                    day="Tuesday"
                    fn={getDayProgressPercent}
                  />
                  <DayNameCell
                    time={timeObject}
                    day="Wednesday"
                    fn={getDayProgressPercent}
                  />
                  <DayNameCell
                    time={timeObject}
                    day="Thursday"
                    fn={getDayProgressPercent}
                  />
                  <DayNameCell
                    time={timeObject}
                    day="Friday"
                    fn={getDayProgressPercent}
                  />
                  <DayNameCell
                    time={timeObject}
                    day="Saturday"
                    fn={getDayProgressPercent}
                  />
                </tr>
              </thead>
              <tbody>
                <tr className={clsx({ 'bg-black': checkClassSlot(1) })}>
                  <td
                    className="border-2 border-black p-2 bg-[#0A2B3E] w-[80px]"
                    rowSpan={4}
                    valign="middle"
                    align="center"
                  >
                    AM
                  </td>
                  <ClassSegmentCells block={1} />
                  <ClassTableCell time={timeObject} block={1} day={1} />
                  <ClassTableCell time={timeObject} block={1} day={2} />
                  <ClassTableCell time={timeObject} block={1} day={3} />
                  <ClassTableCell time={timeObject} block={1} day={4} />
                  <ClassTableCell time={timeObject} block={1} day={5} />
                  <ClassTableCell time={timeObject} block={1} day={6} />
                </tr>
                <tr className={clsx({ 'bg-black': checkClassSlot(2) })}>
                  <ClassSegmentCells block={2} />
                  <ClassTableCell time={timeObject} block={2} day={1} />
                  <ClassTableCell time={timeObject} block={2} day={2} />
                  <ClassTableCell time={timeObject} block={2} day={3} />
                  <ClassTableCell time={timeObject} block={2} day={4} />
                  <ClassTableCell time={timeObject} block={2} day={5} />
                  <ClassTableCell time={timeObject} block={2} day={6} />
                </tr>
                <tr className={clsx({ 'bg-black': checkClassSlot(3) })}>
                  <ClassSegmentCells block={3} />
                  <ClassTableCell time={timeObject} block={3} day={1} />
                  <ClassTableCell time={timeObject} block={3} day={2} />
                  <ClassTableCell time={timeObject} block={3} day={3} />
                  <ClassTableCell time={timeObject} block={3} day={4} />
                  <ClassTableCell time={timeObject} block={3} day={5} />
                  <ClassTableCell time={timeObject} block={3} day={6} />
                </tr>
                <tr className={clsx({ 'bg-black': checkClassSlot(4) })}>
                  <ClassSegmentCells block={4} />
                  <ClassTableCell time={timeObject} block={4} day={1} />
                  <ClassTableCell time={timeObject} block={4} day={2} />
                  <ClassTableCell time={timeObject} block={4} day={3} />
                  <ClassTableCell time={timeObject} block={4} day={4} />
                  <ClassTableCell time={timeObject} block={4} day={5} />
                  <ClassTableCell time={timeObject} block={4} day={6} />
                </tr>
                <tr id="LunchBreakRow">
                  <td
                    className="border-2 border-black p-2 h-[140px]"
                    valign="middle"
                    align="center"
                  >
                    Lunch
                  </td>
                  <td
                    colSpan={8}
                    className="border-2 border-black p-2 h-[140px]"
                    valign="middle"
                    align="center"
                  >
                    {times[0].start} - {times[0].end}
                  </td>
                </tr>
                <tr className={clsx({ 'bg-black': checkClassSlot(5) })}>
                  <td
                    className="border-2 border-black p-2 bg-[#0A2B3E]"
                    rowSpan={4}
                    valign="middle"
                    align="center"
                  >
                    PM
                  </td>
                  <ClassSegmentCells block={5} />
                  <ClassTableCell time={timeObject} block={5} day={1} />
                  <ClassTableCell time={timeObject} block={5} day={2} />
                  <ClassTableCell time={timeObject} block={5} day={3} />
                  <ClassTableCell time={timeObject} block={5} day={4} />
                  <ClassTableCell time={timeObject} block={5} day={5} />
                  <ClassTableCell time={timeObject} block={5} day={6} />
                </tr>
                <tr className={clsx({ 'bg-black': checkClassSlot(6) })}>
                  <ClassSegmentCells block={6} />
                  <ClassTableCell time={timeObject} block={6} day={1} />
                  <ClassTableCell time={timeObject} block={6} day={2} />
                  <ClassTableCell time={timeObject} block={6} day={3} />
                  <ClassTableCell time={timeObject} block={6} day={4} />
                  <ClassTableCell time={timeObject} block={6} day={5} />
                  <ClassTableCell time={timeObject} block={6} day={6} />
                </tr>
                <tr className={clsx({ 'bg-black': checkClassSlot(7) })}>
                  <ClassSegmentCells block={7} />
                  <ClassTableCell time={timeObject} block={7} day={1} />
                  <ClassTableCell time={timeObject} block={7} day={2} />
                  <ClassTableCell time={timeObject} block={7} day={3} />
                  <ClassTableCell time={timeObject} block={7} day={4} />
                  <ClassTableCell time={timeObject} block={7} day={5} />
                  <ClassTableCell time={timeObject} block={7} day={6} />
                </tr>
                <tr className={clsx({ 'bg-black': checkClassSlot(8) })}>
                  <ClassSegmentCells block={8} />
                  <ClassTableCell time={timeObject} block={8} day={1} />
                  <ClassTableCell time={timeObject} block={8} day={2} />
                  <ClassTableCell time={timeObject} block={8} day={3} />
                  <ClassTableCell time={timeObject} block={8} day={4} />
                  <ClassTableCell time={timeObject} block={8} day={5} />
                  <ClassTableCell time={timeObject} block={8} day={6} />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BabysSchedulePage
