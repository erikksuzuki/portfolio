'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

const TimeDisplay = ({ time }: any) => {
  const [timeString, setTimeString] = useState('Loading...')
  useEffect(() => {
    setTimeString(
      `${time.dayofweek}, ${time.hour}:${time.minute}:${time.second} ${time.ampm}`
    )
  }, [time])
  return <div>{timeString}</div>
}

const BabysSchedulePage = () => {
  let initialTime = new Date('Sep 17 19:46').getTime()
  const [timeNowHere, setTimeNowHere] = useState<Date>(new Date(initialTime))
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeNowHere((prev) => new Date(new Date(prev).getTime() + 5000))
    }, 5)
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

  return (
    <div>
      <section className="text-left gap-y-6 py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px] relative">
        <div className="w-full">
          <div>My baby&apos;s schedule</div>
          <TimeDisplay time={timeNowReadable} />
          <div
            className={clsx(
              'text-theme-heading-sm',
              { 'text-[#0f0]': !inClassNow },
              { 'text-[red]': inClassNow }
            )}
          >
            {inClassNow ? 'Class in Session' : 'Not in Class'}
          </div>
          <div>{calculateTimeBetween()}</div>
          <div>
            <table className="w-full" width="100%">
              <thead className="bg-[rgba(255,255,255,0.1)]">
                <tr>
                  <th align="center" className="border-2 border-black p-2" />
                  <th align="center" className="border-2 border-black p-2">
                    #
                  </th>
                  <th align="center" className="border-2 border-black p-2">
                    Time
                  </th>
                  <th
                    align="center"
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                  >
                    Monday
                  </th>
                  <th
                    align="center"
                    className={clsx(
                      'data-tue border-2 border-black p-2 relative',
                      {
                        'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                      }
                    )}
                  >
                    {timeNowReadable.dayofweek === 'Tuesday' ? (
                      <div className="w-full left-0 border-2 min-h-[478px] border-[#0f0] max-h-[4px] absolute top-[42px]" />
                    ) : (
                      <div />
                    )}
                    Tuesday
                  </th>
                  <th
                    align="center"
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                  >
                    Wednesday
                  </th>
                  <th
                    align="center"
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                  >
                    Thursday
                  </th>
                  <th
                    align="center"
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                  >
                    Friday
                  </th>
                  <th
                    align="center"
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                  >
                    Saturday
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  id="Block1"
                  className={clsx({ 'bg-black': checkClassSlot(1) })}
                >
                  <td
                    className="border-2 border-black p-2 bg-[#0A2B3E]"
                    rowSpan={4}
                    valign="middle"
                    align="center"
                  >
                    AM
                  </td>
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    1
                  </td>
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[1].start} - {times[1].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={1} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
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
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[2].start} - {times[2].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={2} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
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
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[3].start} - {times[3].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={3} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
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
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[4].start} - {times[4].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={4} day={5} />
                  </td>
                </tr>
                <tr
                  id="LunchBreakRow"
                  className={clsx({
                    'bg-black': checkClassSlot(0),
                  })}
                >
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
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[5].start} - {times[5].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={5} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
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
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[6].start} - {times[6].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={6} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
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
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[7].start} - {times[7].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={7} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
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
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times[8].start} - {times[8].end}
                  </td>
                  <td
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={0} />
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={1} />
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={2} />
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={3} />
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    <TimeSegment block={8} day={4} />
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
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
