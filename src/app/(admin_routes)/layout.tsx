import { AuthProvider } from '@/contexts/auth-context'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'TickDoc - Gestão Integrada',
  description:
    'TickDoc - Gestão Integrada. Um produto da Rede Participar Brasil de Tecnologia.',
  manifest: '/admin-manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  authors: [
    { name: 'Rede Participar', url: 'https://redeparticiparbrasil.com.br/' },
    { name: 'Economic News Brasil', url: 'https://economicnewsbrasil.com.br' },
    { name: 'Leonardo Carmo' },
  ],
  icons: [
    { rel: 'apple-touch-icon', url: '/icon-128x128.png' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
}

export default function AdminRoutesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
