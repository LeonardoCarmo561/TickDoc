'use client'
import defaultLogo from '../../../../../public/default_logo.png'
import { LoginFormData, TokenData } from '@/@types'
import { Form } from '@/components'
import { loginAdminUser } from '@/services'
import { loginFormSchema } from '@/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { MdLogin } from 'react-icons/md'
import { publicIpv4 } from 'public-ip'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthContext } from '@/utils/hooks'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'

export function AdminLoginForm() {
  const { user, setUser } = useAuthContext()
  const [publicIp, setPublicIp] = useState('')

  const loginUserForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function submit(formData: LoginFormData) {
    loginAdminUser(formData).then((result) => {
      if (result instanceof Error) {
        alert(result.message)
      } else {
        const tokenData: TokenData = jwtDecode(result.data.access)
        setUser({
          institutionId: tokenData.institution_id,
          modules: tokenData.modules,
          userId: tokenData.id,
          username: tokenData.username,
          genre: tokenData.gender,
          profilePicture: tokenData.profile_picture,
        })
      }
    })
  }

  useEffect(() => {
    if (user) {
      window.location.replace(
        `/${user.modules[0].type}/${user.modules[0].title}/dashboard`,
      )
    }
  }, [user])

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
    <FormProvider {...loginUserForm}>
      <form
        onSubmit={(formData) => {
          loginUserForm.setValue('client_ip', publicIp)
          handleSubmit(submit)(formData)
        }}
        className="mx-4 rounded-xl shadow-2xl bg-zinc-300 bg-opacity-30 p-4 gap-4 max-w-sm w-full flex flex-col justify-center items-center"
      >
        <Image alt="tickdoc" src={defaultLogo} priority />

        <Form.Field>
          <Form.Label htmlFor="email" className="text-zinc-700">
            E-mail
          </Form.Label>
          <Form.Input type="email" name="email" />
          <Form.ErrorMessage field="email" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="password" className="text-zinc-700">
            Senha
          </Form.Label>
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
          <Link
            role="button"
            href="/reset_password"
            target="_blank"
            className="w-full gap-1 text-center font-semibold transition-all hover:bg-blue-500 hover:bg-opacity-25 flex items-center justify-center rounded-xl border-blue-500 border-[2px] text-black shadow-2xl"
          >
            ESQUECI A SENHA
          </Link>
        </div>
      </form>
    </FormProvider>
  )
}
