export function formatAMPM(date: string) {
  const thisDate = new Date(date)
  var hours = thisDate.getHours()
  var minutes: string | number = thisDate.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

export function formatDateOrdinal(
  date: string,
  truncate: boolean,
  year: boolean
) {
  const dateObject = new Date(date)
  const month = dateObject.toLocaleString('en-US', { month: 'long' })
  const ordinal_suffix_of = (dayNumber: number) => {
    let j = dayNumber % 10,
      k = dayNumber % 100
    if (j == 1 && k != 11) return dayNumber.toString() + 'st'
    if (j == 2 && k != 12) return dayNumber.toString() + 'nd'
    if (j == 3 && k != 13) return dayNumber.toString() + 'rd'
    return dayNumber.toString() + 'th'
  }
  const appendedYear = year ? `, ${dateObject.getFullYear()}` : ''
  return (
    `${!truncate ? month : month.substring(0, 3)} ${
      !truncate
        ? ordinal_suffix_of(dateObject.getDate())
        : dateObject.getDate().toString().length === 1
        ? `0${dateObject.getDate()}`
        : dateObject.getDate()
    }` + appendedYear
  )
}
