import { Metadata } from 'next'
import Image from 'next/image'
import defaultLogo from '../../../../../public/default_logo.png'
import { ResetPasswordTokenForm } from '@/components/pages/reset_password'

export const metadata: Metadata = {
  title: 'Redefinir Senha - Administração | TickDoc',
  description: 'Mantenha a sua senha guardada em um lugar seguro',
}

export default function ResetPasswordTokenPage({
  params,
}: {
  params: { token: string }
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="p-2 bg-zinc-200 rounded-xl shadow-lg dark:bg-zinc-900 max-w-full w-80 flex flex-col">
        <Image
          alt="TickDoc Logo"
          src={defaultLogo}
          className="max-w-[300px] w-auto h-auto"
        />
        <h1 className="text-xl font-bold text-center">Insira sua Nova Senha</h1>

        <span className="text-center font-semibold">
          Mantenha a sua senha guardada em um lugar seguro
        </span>

        <ResetPasswordTokenForm token={params.token} />
      </main>
    </div>
  )
}
