import Image from 'next/image'

import defaultLogo from '../../../public/default_logo.png'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada · TickDoc',
  description:
    'TickDoc - Gestão Integrada. Um produto da Rede Participar Brasil de Tecnologia',
}

export default function Custom404() {
  return (
    <main className="flex h-screen w-screen justify-center items-center flex-col">
      <Image
        priority
        alt="TickDoc Logo"
        src={defaultLogo}
        width={500}
        className="h-auto max-w-full"
      />
      <span className="text-blue-500 text-xl font-semibold">
        Hm... Página não encontrada
      </span>
      <span className="text-xs">
        verifique se a URL foi digitada corretamente
      </span>
    </main>
  )
}
