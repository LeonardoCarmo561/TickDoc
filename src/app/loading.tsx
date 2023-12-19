import Image from 'next/image'

import defaultLogo from '../../public/default_logo.png'

export default function Loading() {
  return (
    <main
      className="
        flex w-screen h-screen justify-center items-center flex-col box-border bg-zinc-800
      "
    >
      <Image
        priority
        width={300}
        src={defaultLogo}
        alt="TickDoc Logo"
        className="w-auto h-auto"
      />
      <span className="text-blue-500 text-lg text-center">Carregando...</span>
    </main>
  )
}
