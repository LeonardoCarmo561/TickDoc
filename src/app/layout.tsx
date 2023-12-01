import type { Metadata } from 'next'
import { League_Spartan as LeagueSpartan } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/theme-context'
import Script from 'next/script'
import { ToastProvider } from '@/contexts'

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
      <head>
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="google-tag-manager"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MNK5ZRTN')`,
            }}
          />
        )}
      </head>
      <body
        className={`bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white ${leagueSpartan.className}`}
      >
        {process.env.NODE_ENV === 'production' && (
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNK5ZRTN"
            height="0"
            width="0"
          ></iframe>
        )}
        <ToastProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
