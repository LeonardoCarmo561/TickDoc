import { formatDate } from '..'

export function formatDatetime(value: string): string {
  const date = value.split('T')[0]
  const time = value.split('T')[1]

  const splitedTime = time.split(':')
  const hour = splitedTime[0]
  const minute = splitedTime[1]

  const formatedDate = formatDate(date)

  return `${formatedDate} às ${hour}:${minute}h`
}
