import { ReactNode } from 'react'

import { UserData } from '..'

export type AuthContextData = {
  user: UserData | null
  setUser: (value: UserData | null) => void
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
