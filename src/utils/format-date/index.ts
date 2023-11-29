export function formatDate(date: string) {
  const splitedDate = date.split('-')

  const day = splitedDate[2]
  const month = splitedDate[1]
  const year = splitedDate[0]

  return `${day}/${month}/${year}`
}
