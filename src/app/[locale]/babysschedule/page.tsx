import clsx from 'clsx'

const BabysSchedulePage = () => {
  const timeNow = new Date('Sep 17 6:04 PM')
  const daysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const timeNowReadable = {
    dayofweek: daysOfTheWeek[timeNow.getDay()],
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
                  <th className="border-2 border-black p-2">Time 1</th>
                  <th className="border-2 border-black p-2">#</th>
                  <th className="border-2 border-black p-2">Time 2</th>
                  <th
                    className={clsx('data-mon border-2 border-black p-2', {
                      'bg-[red]': timeNowReadable.dayofweek === 'Monday',
                    })}
                  >
                    Monday
                  </th>
                  <th
                    className={clsx('data-tue border-2 border-black p-2', {
                      'bg-[green]': timeNowReadable.dayofweek === 'Tuesday',
                    })}
                  >
                    Tuesday
                  </th>
                  <th className="data-wed border-2 border-black p-2">
                    Wednesday
                  </th>
                  <th className="data-thu border-2 border-black p-2">
                    Thursday
                  </th>
                  <th className="data-fri border-2 border-black p-2">Friday</th>
                  <th className="data-sat border-2 border-black p-2">
                    Saturday
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr id="Block1">
                  <td className="border-2 border-black p-2" rowSpan={4}>
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
                    7:20 - 8:00 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr id="Block2">
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
                    8:15 - 8:55 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr id="Block3">
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
                    9:05 - 9:45 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr id="Block4">
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
                    9:50 - 10:30 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr id="LunchBreakRow">
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
                    10:30 AM - 1:05 PM
                  </td>
                </tr>
                <tr id="Block5">
                  <td className="border-2 border-black p-2" rowSpan={4}>
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
                    7:20 - 8:00 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr id="Block6">
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
                    8:15 - 8:55 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr id="Block7">
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
                    9:05 - 9:45 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    sattime
                  </td>
                </tr>
                <tr id="Block8">
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
                    9:50 - 10:30 AM
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
                    className="data-wed border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    wedtime
                  </td>
                  <td
                    className="data-thu border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    thutime
                  </td>
                  <td
                    className="data-fri border-2 border-black p-2"
                    valign="middle"
                    align="center"
                  >
                    fritime
                  </td>
                  <td
                    className="data-sat border-2 border-black p-2"
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
