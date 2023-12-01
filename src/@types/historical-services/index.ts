export type HistoricalData = {
  field: string
  type: '+' | '~' | '-'
  date: string
  user?: string
  old?: string
  new?: string
}
