'use client'
import { Header } from '@/components/header'
import { LoadingScreen } from '@/components/loading-screen'
import { DrawerProvider } from '@/contexts/drawer-context'
import { ModuleProvider } from '@/contexts/module-context'
import { useAuthContext } from '@/utils/hooks'
import { ReactNode } from 'react'

export default function CustomerServiceLayout({
  children,
  params,
}: {
  children: ReactNode
  params: {
    module_title: string
  }
}) {
  const { user, logout } = useAuthContext()

  if (user && user.modules.length === 0) {
    logout()
  } else if (
    user &&
    user.modules.find(
      (module) =>
        module.type === 'customer-service' &&
        module.title === params.module_title,
    ) === undefined
  ) {
    alert('Sem acesso ao módulo')
    window.location.href = `/${user.modules[0].type}/${user.modules[0].title}/dashboard`
  } else
    return (
      <ModuleProvider moduleTitle={params.module_title}>
        <DrawerProvider>
          <Header moduleTitle={params.module_title} moduleType="S.A.C" />
          {children}
        </DrawerProvider>
      </ModuleProvider>
    )

  return <LoadingScreen />
}
