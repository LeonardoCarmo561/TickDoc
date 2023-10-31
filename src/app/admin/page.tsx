'use client'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { MdLogin } from 'react-icons/md'

import defaultLogo from '../../../public/default_logo.png'
import { loginAdminUser } from '@/services'
import { Form } from '@/components'
import { LoginFormData } from '@/@types'
import { loginFormSchema } from '@/utils'
import { useEffect, useState } from 'react'
import { publicIpv4 } from 'public-ip'

export default function Home() {
  const [publicIp, setPublicIp] = useState('')
  const loginUserForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function submit(formData: LoginFormData) {
    console.log(formData)
    try {
      const result = await loginAdminUser(formData)
      console.log(result.data)
    } catch (error) {
      console.error((error as { message: string }).message)
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = loginUserForm

  useEffect(() => {
    publicIpv4()
      .then((result) => {
        setPublicIp(result)
      })
      .catch(() => alert('Não foi possível identificar seu IP Público'))
  }, [])

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-300 to bg-blue-500 justify-center items-center">
      <FormProvider {...loginUserForm}>
        <form
          onSubmit={(formData) => {
            loginUserForm.setValue('client_ip', publicIp)
            handleSubmit(submit)(formData)
          }}
          className="mx-4 rounded-xl shadow-2xl bg-zinc-300 bg-opacity-30 p-4 gap-4 max-w-sm w-full flex flex-col justify-center items-center"
        >
          <Image alt="tickdoc" src={defaultLogo} />

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Input type="email" name="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input type="password" name="password" />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <div className="flex w-full gap-2 px-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="p-2 w-full gap-1 flex transition-all items-center justify-center hover:bg-blue-700 hover:text-white rounded-xl bg-blue-500"
            >
              <MdLogin />
              ENTRAR
            </button>
            <button
              type="button"
              className="w-full gap-1 transition-all hover:bg-blue-500 hover:bg-opacity-25 flex items-center justify-center rounded-xl border-blue-500 border-[2px] text-black shadow-2xl"
            >
              ESQUECI A SENHA
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  )
}
