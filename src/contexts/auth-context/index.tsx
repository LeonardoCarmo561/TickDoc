'use client'

import { AuthContextData, AuthProviderProps, UserData } from '@/@types'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
