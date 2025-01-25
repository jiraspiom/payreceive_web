const monthNames = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
]

export const navigationMes = (
  currentMonthIndex: number,
  currentYear: number,
  direction: number
) => {
  const newMonthIndex =
    (currentMonthIndex + direction + monthNames.length) % monthNames.length

  const newYear =
    currentYear +
    Math.floor((currentMonthIndex + direction) / monthNames.length)

  return {
    index: newMonthIndex + 1,
    name: monthNames[newMonthIndex],
    year: newYear,
  }
}
