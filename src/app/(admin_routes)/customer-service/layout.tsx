'use client'

import { LoadingScreen } from '@/components/loading-screen'
import { DrawerProvider } from '@/contexts/drawer-context'
import { useAuthContext } from '@/utils/hooks'
import { ReactNode } from 'react'

export default function CustomerServiceRootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user, logout } = useAuthContext()

  if (user && user.modules.length === 0) {
    logout()
  } else if (
    user &&
    user.modules.find((module) => module.type === 'customer-service') ===
      undefined
  ) {
    alert('Sem acesso ao(s) módulo(s) de S.A.C')
    window.location.href = `/${user.modules[0].type}/${user.modules[0].title}/dashboard`
  } else return <DrawerProvider>{children}</DrawerProvider>

  return <LoadingScreen />
}
