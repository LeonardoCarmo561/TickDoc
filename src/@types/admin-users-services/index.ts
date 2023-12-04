export type AdminUserData = {
  id: number
  username: string
  email: string
  unconfirmed_email?: string
  document_type: number
  document_number: string
  institution_id: number
  is_active: boolean
  is_confirmed: boolean
  confirmed_at?: string
  confirmation_token_sent_at?: string
  confirmation_mail_token_sent_at?: string
  updated_at: string
  created_at: string
  reset_password_sent_at?: string
  last_login?: string
  gender?: number
  last_external_ip_signed?: string
  sign_in_count: number
  profile_picture?: string
  birth_date?: string
  online: boolean
}
