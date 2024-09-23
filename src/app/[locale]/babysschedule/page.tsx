'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const times: any = {
  // Morning begins
  1: { start: '7:20', end: '8:00' },
  2: { start: '8:15', end: '8:55' },
  3: { start: '9:05', end: '9:45' },
  4: { start: '9:50', end: '10:30' },
  // Lunch begins
  0: { start: '10:30', end: '13:05' },
  // Afternoon begins
  5: { start: '13:05', end: '13:45' },
  6: { start: '14:00', end: '14:40' },
  7: { start: '14:45', end: '15:25' },
  8: { start: '15:30', end: '16:10' },
}
const schedule: any = {
  Monday: ['.', '.', '1', '1', '.', '1', '1', '1'],
  Tuesday: ['1', '1', '.', '.', '.', '.', '.', '1'],
  Wednesday: ['1', '1', '.', '1', '1', '1', '.', '.'],
  Thursday: ['1', '.', '1', '1', '.', '.', '1', '1'],
  Friday: ['1', '1', '.', '.', '.', '.', '1', '1'],
  Saturday: ['.', '.', '.', '.', '.', '.', '1', '1'],
  Sunday: ['.', '.', '.', '.', '.', '.', '.', '.'],
}

function getLocalDateTime(timeZone: any) {
  const localtime = new Date().toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    timeZone: timeZone,
  })
  const thisYear = new Date().getFullYear().toString()
  const localMonth = monthNames[
    Number(localtime.split(',')[0].split('/')[0]) - 1
  ].slice(0, 3)
  const localDay = localtime.split(',')[0].split('/')[1]
  const localTime = localtime.split(',')[1].slice(-5)
  const seconds =
    new Date().getSeconds().toString().length === 1
      ? `0${new Date().getSeconds()}`
      : new Date().getSeconds()
  return `${thisYear} ${localMonth} ${localDay} ${localTime}:${seconds}`
}

const TimeDisplay = ({ time }: any) => {
  const [timeString, setTimeString] = useState<any>()
  useEffect(() => {
    setTimeString(time)
  }, [time])
  return (
    <div className="text-left text-theme-heading-sm inline-block w-[108px]">
      <div className="relative">
        <figure className="absolute top-[2px] right-0 text-theme-xs">
          {timeString?.ampm}
        </figure>
        {timeString?.hour.toString().length === 2
          ? timeString.hour
          : '0' + timeString?.hour}
        :{timeString?.minute}{' '}
        <figure className="absolute bottom-[4px] right-0 text-theme-sm">
          {timeString?.second}
        </figure>
      </div>
    </div>
  )
}

const DateDisplay = ({ time }: any) => {
  const [dateString, setDateString] = useState('')
  useEffect(() => {
    setDateString(
      `${time.dayofweek}, ${monthNames[time.month - 1]} ${time.day}`
    )
  }, [time])
  return <div>{dateString}</div>
}

const TimeSegment = ({ block, day }: { block: number; day: number }) => {
  if (schedule[daysOfTheWeek[day + 1]][block - 1] === '.' ? '' : 'class') {
    return <div className="w-full h-full bg-[rgba(255,255,255,0.4)]">-</div>
  } else {
    return <div></div>
  }
}

interface ClassTableCellProps {
  time: any
  block: number
  day: number
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

const DayNameCell = ({ time, day, fn }: any) => {
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

const BabysSchedulePage = () => {
  const initialTime = getLocalDateTime('Asia/Phnom_Penh')
  const [timeNow, setTimeNowHere] = useState<Date>(new Date(initialTime))

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimeNowHere((prev) => new Date(new Date(prev).getTime() + 375000))
  //   }, 200)
  //   return () => clearInterval(intervalId)
  // }, [initialTime])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeNowHere(new Date(getLocalDateTime('Asia/Phnom_Penh')))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [initialTime])

  const timeObject = {
    dayofweek: daysOfTheWeek[timeNow.getDay()],
    year: timeNow.getFullYear(),
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
  function calculateTimeBetween() {
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
      return `Current class ends at ${times[currentBlock].end}`
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
      return `Next class starts at ${times[currentBlock].start}`
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
          <TimeDisplay time={timeObject} />
          <DateDisplay time={timeObject} />
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
              ? 'No Class'
              : 'Non-School Hours'}
          </div>
          <div className="w-full text-center mb-4">
            {calculateTimeBetween()}
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
                <tr
                  id="Block1"
                  className={clsx({ 'bg-black': checkClassSlot(1) })}
                >
                  <td
                    className="border-2 border-black p-2 bg-[#0A2B3E] w-[80px]"
                    rowSpan={4}
                    valign="middle"
                    align="center"
                  >
                    AM
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[40px]"
                    valign="middle"
                    align="center"
                  >
                    1
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[1].start} - {times[1].end}
                  </td>
                  <ClassTableCell time={timeObject} block={1} day={1} />
                  <ClassTableCell time={timeObject} block={1} day={2} />
                  <ClassTableCell time={timeObject} block={1} day={3} />
                  <ClassTableCell time={timeObject} block={1} day={4} />
                  <ClassTableCell time={timeObject} block={1} day={5} />
                  <ClassTableCell time={timeObject} block={1} day={6} />
                </tr>
                <tr
                  id="Block2"
                  className={clsx({ 'bg-black': checkClassSlot(2) })}
                >
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    2
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[2].start} - {times[2].end}
                  </td>
                  <ClassTableCell time={timeObject} block={2} day={1} />
                  <ClassTableCell time={timeObject} block={2} day={2} />
                  <ClassTableCell time={timeObject} block={2} day={3} />
                  <ClassTableCell time={timeObject} block={2} day={4} />
                  <ClassTableCell time={timeObject} block={2} day={5} />
                  <ClassTableCell time={timeObject} block={2} day={6} />
                </tr>
                <tr
                  id="Block3"
                  className={clsx({ 'bg-black': checkClassSlot(3) })}
                >
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    3
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[3].start} - {times[3].end}
                  </td>
                  <ClassTableCell time={timeObject} block={3} day={1} />
                  <ClassTableCell time={timeObject} block={3} day={2} />
                  <ClassTableCell time={timeObject} block={3} day={3} />
                  <ClassTableCell time={timeObject} block={3} day={4} />
                  <ClassTableCell time={timeObject} block={3} day={5} />
                  <ClassTableCell time={timeObject} block={3} day={6} />
                </tr>
                <tr
                  id="Block4"
                  className={clsx({ 'bg-black': checkClassSlot(4) })}
                >
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    4
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[4].start} - {times[4].end}
                  </td>
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
                <tr
                  id="Block5"
                  className={clsx({ 'bg-black': checkClassSlot(5) })}
                >
                  <td
                    className="border-2 border-black p-2 bg-[#0A2B3E]"
                    rowSpan={4}
                    valign="middle"
                    align="center"
                  >
                    PM
                  </td>
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    5
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[5].start} - {times[5].end}
                  </td>
                  <ClassTableCell time={timeObject} block={5} day={1} />
                  <ClassTableCell time={timeObject} block={5} day={2} />
                  <ClassTableCell time={timeObject} block={5} day={3} />
                  <ClassTableCell time={timeObject} block={5} day={4} />
                  <ClassTableCell time={timeObject} block={5} day={5} />
                  <ClassTableCell time={timeObject} block={5} day={6} />
                </tr>
                <tr
                  id="Block6"
                  className={clsx({ 'bg-black': checkClassSlot(6) })}
                >
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    6
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[6].start} - {times[6].end}
                  </td>
                  <ClassTableCell time={timeObject} block={6} day={1} />
                  <ClassTableCell time={timeObject} block={6} day={2} />
                  <ClassTableCell time={timeObject} block={6} day={3} />
                  <ClassTableCell time={timeObject} block={6} day={4} />
                  <ClassTableCell time={timeObject} block={6} day={5} />
                  <ClassTableCell time={timeObject} block={6} day={6} />
                </tr>
                <tr
                  id="Block7"
                  className={clsx({ 'bg-black': checkClassSlot(7) })}
                >
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    7
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[7].start} - {times[7].end}
                  </td>

                  <ClassTableCell time={timeObject} block={7} day={1} />
                  <ClassTableCell time={timeObject} block={7} day={2} />
                  <ClassTableCell time={timeObject} block={7} day={3} />
                  <ClassTableCell time={timeObject} block={7} day={4} />
                  <ClassTableCell time={timeObject} block={7} day={5} />
                  <ClassTableCell time={timeObject} block={7} day={6} />
                </tr>
                <tr
                  id="Block8"
                  className={clsx({ 'bg-black': checkClassSlot(8) })}
                >
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    8
                  </td>
                  <td
                    className="border-2 border-black p-2 w-[120px]"
                    valign="middle"
                    align="center"
                  >
                    {times[8].start} - {times[8].end}
                  </td>

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
