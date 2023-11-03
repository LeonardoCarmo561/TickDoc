'use client'

import { LoadingScreen } from '@/components/loading-screen'
import { useAuthContext } from '@/utils/hooks'
import { ReactNode } from 'react'

export default function OmbudsmanRootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user, logout } = useAuthContext()

  if (user && user.modules.length === 0) {
    logout()
  } else if (
    user &&
    user.modules.find((module) => module.type === 'ombudsman') === undefined
  ) {
    alert('Sem acesso ao(s) módulo(s) de ouvidoria')
    window.location.href = `/${user.modules[0].type}/${user.modules[0].title}/dashboard`
  } else return children

  return <LoadingScreen />
}
