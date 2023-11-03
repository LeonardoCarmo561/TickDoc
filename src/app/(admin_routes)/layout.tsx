import { AuthProvider } from '@/contexts/auth-context'
import { ReactNode } from 'react'

export default function AdminRoutesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
