export * from './auth-services'
export * from './clients-services'

export type TotalCount<T> = {
  next: string
  count: number
  previous: string
  data: T[]
  results: T[]
}
