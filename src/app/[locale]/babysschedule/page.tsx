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

const TimeDisplay = ({ time }: any) => {
  const [timeString, setTimeString] = useState('Loading...')
  const [dateString, setDateString] = useState('')
  useEffect(() => {
    setDateString(
      `${time.dayofweek}, ${monthNames[time.month - 1]} ${time.day}`
    )
    setTimeString(`${time.hour}:${time.minute} ${time.ampm}`)
  }, [time])
  return (
    <div className="text-center w-full">
      <div>{timeString}</div>
      <div>{dateString}</div>
    </div>
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
  const localtime = new Date().toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    timeZone: 'Asia/Phnom_Penh',
  })
  const currentMonth = monthNames[
    Number(localtime.split(',')[0].split('/')[0]) - 1
  ].slice(0, 3)
  const currentDay = localtime.split(',')[0].split('/')[1]
  const currentTime = localtime.split(',')[1].slice(-5)
  const currentDate = `${currentMonth} ${currentDay} ${currentTime}`

  let initialTime = new Date(`${currentDate}`).getTime()

  const [timeNowHere, setTimeNowHere] = useState<Date>(new Date(initialTime))
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimeNowHere((prev) => new Date(new Date(prev).getTime() + 375000))
  //   }, 50)
  //   return () => clearInterval(intervalId)
  // }, [initialTime])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeNowHere(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [initialTime])

  const timeNow = new Date(timeNowHere.getTime() + 1000 * 60 * 60 * 14)
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
  const TimeSegment = ({ block, day }: { block: number; day: number }) => {
    if (schedule[daysOfTheWeek[day + 1]][block - 1] === '.' ? '' : 'class') {
      return <div className="w-full h-full bg-[rgba(255,255,255,0.4)]">-</div>
    } else {
      return <div></div>
    }
  }
  const timeNowReadable = {
    dayofweek: daysOfTheWeek[timeNow.getDay()],
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
      timeNow.getSeconds().toString().length === 1
        ? `0${timeNow.getSeconds()}`
        : timeNow.getSeconds(),
    ampm: timeNow.getHours() > 12 ? 'PM' : 'AM',
  }
  function checkClassSlot(slotNumber: number) {
    if (
      timeNow.getTime() >=
        new Date(
          `${timeNowReadable.month} ${timeNowReadable.day} ${times[slotNumber].start}`
        ).getTime() &&
      timeNow.getTime() <=
        new Date(
          `${timeNowReadable.month} ${timeNowReadable.day} ${times[slotNumber].end}`
        ).getTime()
    ) {
      if (schedule[timeNowReadable.dayofweek][slotNumber - 1] === '.') {
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
      schedule[timeNowReadable.dayofweek].forEach(
        (timeSlot: string, index: number) => {
          const nextSlotStart: Date = new Date(
            `${timeNowReadable.month} ${timeNowReadable.day} ${
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
      schedule[timeNowReadable.dayofweek].forEach(
        (timeSlot: string, index: number) => {
          const thisBlockStart: Date = new Date(
            `${timeNowReadable.month} ${timeNowReadable.day} ${
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
        `${timeNowReadable.month} ${
          timeNowReadable.day
        } ${timeNow.getHours()}:${timeNowReadable.minute}`
      ).getTime() <
        new Date(
          `${timeNowReadable.month} ${timeNowReadable.day} 7:20`
        ).getTime() ||
      new Date(
        `${timeNowReadable.month} ${
          timeNowReadable.day
        } ${timeNow.getHours()}:${timeNowReadable.minute}`
      ).getTime() >
        new Date(
          `${timeNowReadable.month} ${timeNowReadable.day} 16:10`
        ).getTime()
    ) {
      isSchoolHours = false
    } else {
      isSchoolHours = true
    }

    let minutesIn = 0
    let totalAvailableMinutes = 530
    if (isSchoolHours) {
      minutesIn =
        (timeNow.getHours() - 7) * 60 + Number(timeNowReadable.minute) - 20
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
          <TimeDisplay time={timeNowReadable} />
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
                timeNowReadable.dayofweek !== 'Sunday'
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
                  <th
                    align="center"
                    className={clsx(
                      'data-mon border-2 border-black p-2 relative',
                      {
                        'bg-[rgba(0,0,0,0.4)]':
                          timeNowReadable.dayofweek === 'Monday',
                      }
                    )}
                  >
                    {timeNowReadable.dayofweek === 'Monday' ? (
                      <DayProgressColumnDisplay
                        progressPercent={getDayProgressPercent().dayProgress}
                        isSchoolHours={getDayProgressPercent().isSchoolHours}
                      />
                    ) : (
                      <div />
                    )}
                    Mon
                  </th>
                  <th
                    align="center"
                    className={clsx(
                      'data-tue border-2 border-black p-2 relative',
                      {
                        'bg-[rgba(0,0,0,0.4)]':
                          timeNowReadable.dayofweek === 'Tuesday',
                      }
                    )}
                  >
                    {timeNowReadable.dayofweek === 'Tuesday' ? (
                      <DayProgressColumnDisplay
                        progressPercent={getDayProgressPercent().dayProgress}
                        isSchoolHours={getDayProgressPercent().isSchoolHours}
                      />
                    ) : (
                      <div />
                    )}
                    Tue
                  </th>
                  <th
                    align="center"
                    className={clsx(
                      'data-wed border-2 border-black p-2 relative',
                      {
                        'bg-[rgba(0,0,0,0.4)]':
                          timeNowReadable.dayofweek === 'Wednesday',
                      }
                    )}
                  >
                    {timeNowReadable.dayofweek === 'Wednesday' ? (
                      <DayProgressColumnDisplay
                        progressPercent={getDayProgressPercent().dayProgress}
                        isSchoolHours={getDayProgressPercent().isSchoolHours}
                      />
                    ) : (
                      <div />
                    )}
                    Wed
                  </th>
                  <th
                    align="center"
                    className={clsx(
                      'data-thu border-2 border-black p-2 relative',
                      {
                        'bg-[rgba(0,0,0,0.4)]':
                          timeNowReadable.dayofweek === 'Thursday',
                      }
                    )}
                  >
                    {timeNowReadable.dayofweek === 'Thursday' ? (
                      <DayProgressColumnDisplay
                        progressPercent={getDayProgressPercent().dayProgress}
                        isSchoolHours={getDayProgressPercent().isSchoolHours}
                      />
                    ) : (
                      <div />
                    )}
                    Thu
                  </th>
                  <th
                    align="center"
                    className={clsx(
                      'data-fri border-2 border-black p-2 relative',
                      {
                        'bg-[rgba(0,0,0,0.4)]':
                          timeNowReadable.dayofweek === 'Friday',
                      }
                    )}
                  >
                    {timeNowReadable.dayofweek === 'Friday' ? (
                      <DayProgressColumnDisplay
                        progressPercent={getDayProgressPercent().dayProgress}
                        isSchoolHours={getDayProgressPercent().isSchoolHours}
                      />
                    ) : (
                      <div />
                    )}
                    Fri
                  </th>
                  <th
                    align="center"
                    className={clsx(
                      'data-sat border-2 border-black p-2 relative',
                      {
                        'bg-[rgba(0,0,0,0.4)]':
                          timeNowReadable.dayofweek === 'Saturday',
                      }
                    )}
                  >
                    {timeNowReadable.dayofweek === 'Saturday' ? (
                      <DayProgressColumnDisplay
                        progressPercent={getDayProgressPercent().dayProgress}
                        isSchoolHours={getDayProgressPercent().isSchoolHours}
                      />
                    ) : (
                      <div />
                    )}
                    Sat
                  </th>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={5} />
                  </td>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={5} />
                  </td>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={5} />
                  </td>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={5} />
                  </td>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={5} />
                  </td>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={5} />
                  </td>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={5} />
                  </td>
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
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[rgba(0,0,0,0.4)]':
                        timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={5} />
                  </td>
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
