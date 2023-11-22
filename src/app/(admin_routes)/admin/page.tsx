import { AdminLoginForm } from '@/components/pages/admin'

import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Administração · TickDoc',
  description: 'Página de acesso ao ambiente de administração TickDoc',
}

export default function LoginAdminPages() {
  return process.env.NODE_ENV === 'production' ? (
    redirect('/admin')
  ) : (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-300 to bg-blue-500 justify-center items-center">
      <AdminLoginForm />
    </main>
  )
}
