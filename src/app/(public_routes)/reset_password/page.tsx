import { Metadata } from 'next'
import Image from 'next/image'

import defaultLogo from '../../../../public/default_logo.png'
import { ResetPasswordForm } from '@/components/pages/reset_password'

export const metadata: Metadata = {
  title: 'Esqueci a Senha - Administração | TickDoc',
  description:
    'Esqueceu sua senha? Digite seu e-mail e enviaremos um link para redefinição',
}

export default function ResetPasswordPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="p-2 bg-zinc-200 rounded-xl shadow-lg dark:bg-zinc-900 max-w-full w-80 flex flex-col">
        <Image
          alt="TickDoc Logo"
          src={defaultLogo}
          className="max-w-[300px] w-auto h-auto"
        />
        <h1 className="text-xl font-bold text-center">Esqueceu sua senha?</h1>

        <span className="text-center font-semibold">
          Digite seu email e enviaremos um link para redefinição
        </span>
        <ResetPasswordForm />
      </main>
    </div>
  )
}
