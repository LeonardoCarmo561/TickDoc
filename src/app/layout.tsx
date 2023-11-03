import type { Metadata } from 'next'
import { League_Spartan as LeagueSpartan } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/theme-context'

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
      <body
        className={`bg-zinc-100 dark:bg-zinc-800 ${leagueSpartan.className}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
