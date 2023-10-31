import type { Metadata } from 'next'
import { League_Spartan as LeagueSpartan } from 'next/font/google'
import './globals.css'

const leagueSpartan = LeagueSpartan({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TickDoc - Gestão Integrada',
  description:
    'TickDoc - Gestão Integrada. Um produto da Rede Participar Brasil de Tecnologia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={leagueSpartan.className}>{children}</body>
    </html>
  )
}
