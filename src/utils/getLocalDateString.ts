import { monthNames } from '@/components/ClassScheduler/static/monthNames'

export function getLocalDateString(timeZone: any) {
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
