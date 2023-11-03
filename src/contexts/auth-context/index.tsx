'use client'

import {
  AuthContextData,
  AuthProviderProps,
  TokenData,
  UserData,
} from '@/@types'
import { LoadingScreen } from '@/components/loading-screen'
import { refreshToken } from '@/services'
import { api } from '@/services/config'
import { jwtDecode } from 'jwt-decode'
import { usePathname } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [updatingToken, setUpdatingToken] = useState(true)
  const pathName = usePathname()

  function handleLogout() {
    api
      .post('/V1/api/logout/')
      .then(() => {
        setUser(null)
        window.location.href = '/admin'
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    setUpdatingToken(false)
    refreshToken()
      .then((result) => {
        if (result instanceof Error) {
          if (pathName !== '/admin') {
            alert('Faça login')
            window.location.href = '/admin'
          }
          setUser(null)
        } else {
          const tokenData: TokenData = jwtDecode(result.access)
          setUser({
            institutionId: tokenData.institution_id,
            modules: tokenData.modules,
            userId: tokenData.id,
            username: tokenData.username,
            genre: tokenData.gender,
            profilePicture: tokenData.profile_picture,
          })
          if (pathName === '/admin') {
            window.location.href = `/${tokenData.modules[0].type}/${tokenData.modules[0].title}/dashboard`
          }
        }
      })
      .catch(() => alert('Erro desconhecido'))
      .finally(() => setUpdatingToken(false))
  }, [pathName])

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      <div className="w-screen h-screen overflow-hidden flex flex-col">
        {updatingToken ? <LoadingScreen /> : props.children}
      </div>
    </AuthContext.Provider>
  )
}
