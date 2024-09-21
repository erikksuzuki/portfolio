import clsx from 'clsx'

const BabysSchedulePage = () => {
  const daysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const times: any = {
    1: { start: '7:20', end: '8:00' },
    2: { start: '8:15', end: '8:55' },
    3: { start: '9:05', end: '9:45' },
    4: { start: '9:50', end: '10:30' },
    lunch: { start: '10:30', end: '13:05' },
    5: { start: '13:05', end: '13:45' },
    6: { start: '14:00', end: '14:40' },
    7: { start: '14:45', end: '15:25' },
    8: { start: '15:30', end: '16:10' },
  }
  const timeNowDetails = {
    month: 'Sep',
    day: '19',
    time: '14:37',
  }

  const timeNow = new Date()
  const timeNowReadable = {
    dayofweek: daysOfTheWeek[timeNow.getDay()],
    month: timeNow.getMonth(),
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
    ampm: timeNow.getHours() > 12 ? 'PM' : 'AM',
  }

  function checkClassSlot(slotNumber: number | string) {
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
      return true
    } else {
      return false
    }
  }
  return (
    <div>
      <section className="border text-left gap-y-6 py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px] relative">
        <div className="w-full border border-[#0f0]">
          <div>I love you</div>
          <div>
            The time now: {timeNowReadable.dayofweek}, {timeNowReadable.hour}:
            {timeNowReadable.minute} {timeNowReadable.ampm}
          </div>
          <div>
            <table className="border border-white w-full" width="100%">
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
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                  >
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
                    Morning
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr
                  id="LunchBreakRow"
                  className={clsx({ 'bg-black': checkClassSlot('lunch') })}
                >
                  <td
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    Lunch
                  </td>
                  <td
                    colSpan={8}
                    className="border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    {times['lunch'].start} - {times['lunch'].end}
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
                    Afternoon
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
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
                    montime
                  </td>
                  <td
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    tuetime
                  </td>
                  <td
                    className={clsx('data-wed border-2 border-black p-2', {
                      'bg-[blue]': timeNowReadable.dayofweek === 'Wednesday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className={clsx('data-thu border-2 border-black p-2', {
                      'bg-[teal]': timeNowReadable.dayofweek === 'Thursday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className={clsx('data-fri border-2 border-black p-2', {
                      'bg-[#f0c]': timeNowReadable.dayofweek === 'Friday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className={clsx('data-sat border-2 border-black p-2', {
                      'bg-[#000]': timeNowReadable.dayofweek === 'Saturday',
                    })}
                    valign="middle"
                    align="center"
                  >
                    sattime
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