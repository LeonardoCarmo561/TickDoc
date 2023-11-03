import Image from 'next/image'

import defaultLogo from '../../../public/default_logo.png'

export function LoadingScreen() {
  return (
    <main className="flex flex-1 justify-center items-center flex-col box-border h-max">
      <Image
        alt="TickDoc Logo"
        src={defaultLogo}
        width={300}
        priority
        className="w-auto h-auto"
      />
      <span className="text-blue-500 text-lg text-center">Carregando...</span>
    </main>
  )
}
