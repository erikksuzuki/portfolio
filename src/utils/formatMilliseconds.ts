// takes miliseconds as input and returns formatted minutes and seconds as a string
// does not return hours yet

export function formatMilliseconds(ms: number, denoted?: boolean): string {
  let hours = Math.floor(ms / 3600000)
  let minutesRemaining = Math.floor(ms / 60000) - hours * 60
  let minutesOnly = Math.floor(ms / 60000)
  let seconds: number = Number(((ms % 60000) / 1000).toFixed(0))
  let conditionalHours = hours === 0 ? '' : `${hours}h `

  if (denoted)
    return (
      conditionalHours +
      minutesRemaining +
      'm ' +
      (seconds < 10 ? '0' : '') +
      seconds +
      's'
    )
  return minutesOnly + ':' + (seconds < 10 ? '0' : '') + seconds
}
