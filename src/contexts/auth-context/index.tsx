'use client'

import {
  AuthContextData,
  AuthProviderProps,
  TokenData,
  UserData,
} from '@/@types'
import { LoadingScreen } from '@/components/loading-screen'
import { refreshToken } from '@/services'
import { jwtDecode } from 'jwt-decode'
import { usePathname } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [updatingToken, setUpdatingToken] = useState(true)
  const pathName = usePathname()

  useEffect(() => {
    setUpdatingToken(false)
    refreshToken()
      .then((result) => {
        if (result instanceof Error) {
          if (pathName !== '/admin') {
            alert('Erro ao atualizar token')
          }
          setUser(null)
        } else {
          const tokenData: TokenData = jwtDecode(result.data.access)
          setUser({
            institutionId: tokenData.institution_id,
            modules: tokenData.modules,
            userId: tokenData.id,
            username: tokenData.username,
            genre: tokenData.gender,
            profilePicture: tokenData.profile_picture,
          })
        }
      })
      .catch(() => alert('Erro desconhecido'))
      .finally(() => setUpdatingToken(false))
  }, [pathName])

  useEffect(() => {
    if (pathName !== '/admin') {
      if (!updatingToken && user === null) {
        alert('Faça login')
        window.location.href = '/admin'
      }
    }
  }, [updatingToken, user, pathName])

  return updatingToken ? (
    <LoadingScreen />
  ) : (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
