import Image from 'next/image'

import defaultLogo from '../../../public/default_logo.png'

export function LoadingScreen() {
  return (
    <main className="flex h-screen w-screen justify-center items-center flex-col gap-2">
      <Image alt="TickDoc Logo" src={defaultLogo} width={300} />
      <span className="text-blue-500 text-lg text-center">Carregando...</span>
    </main>
  )
}
