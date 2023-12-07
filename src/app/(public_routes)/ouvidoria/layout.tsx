import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'TickDoc - Gestão Integrada',
  description:
    'TickDoc - Gestão Integrada. Um produto da Rede Participar Brasil de Tecnologia.',
  manifest: '/ouvidoria-manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#1E90FF' }],
  authors: [
    { name: 'Rede Participar', url: 'https://redeparticiparbrasil.com.br/' },
    { name: 'Economic News Brasil', url: 'https://economicnewsbrasil.com.br' },
    { name: 'Leonardo Carmo' },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: '/icon-128x128.png' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
}

export default function PublicRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return { children }
}
