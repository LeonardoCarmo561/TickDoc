export type PhoneData = {
  title: string
  number: string
}

export type ClientData = {
  /* General Info */
  id: number
  name: string
  status: boolean
  cnpj: string
  prefix: string
  logo: string
  work_field: string | { id: number; label: string }
  modules: string[]
  created_at: string
  updated_at: string

  /* Ombudsman Info */
  ombudsman_email?: string
  slug?: string
  ombudsman_price?: number
  client_type?: number
  ombudsman_plan?: number
  ombudsman_expires_at?: string
  contact_name?: string
  address?: string
  coverage?: number
  anonymous: boolean
  general_information: boolean
  reports: boolean
  compliance: boolean
  states?: string[] | number[]
  cities: string[] | number[]
  ombudsman_limit_days?: number
  ombudsman_title?: string
  working_hour?: string
  phones?: PhoneData[]
  cellphones?: PhoneData[]
  notify_sectors: boolean
  activate_sms: boolean
  sms_quantity?: number
  sms_consumed: number

  /* Internal Comunication Info */
  ci_price?: number
  ci_plan?: number
  ci_title?: string
  ci_expires_at?: string
  ci_extended_days?: number
}
