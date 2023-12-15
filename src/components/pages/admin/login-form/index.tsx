'use client'
import defaultLogo from '../../../../../public/default_logo.png'
import { LoginFormData, TokenData } from '@/@types'
import { Form } from '@/components'
import { loginAdminUser } from '@/services'
import { Environment } from '@/utils'
import { loginFormSchema } from '@/utils/validation/others'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { MdLogin, MdSupportAgent } from 'react-icons/md'
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
    register,
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
        <div>
          <Image alt="tickdoc" src={defaultLogo} priority className="" />
        </div>

        <Form.Field>
          <Form.Label htmlFor="email-field" className="text-zinc-700">
            E-mail
          </Form.Label>
          <input
            id="email-field"
            type="email"
            className="h-10 rounded-xl px-2 text-black shadow-2xl border-gray-400 border-[2px] focus:outline-dodgerblue"
            {...register('email')}
          />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="password-field" className="text-zinc-700">
            Senha
          </Form.Label>
          <input
            id="password-field"
            type="password"
            className="h-10 rounded-xl px-2 text-black shadow-2xl border-gray-400 border-[2px] focus:outline-dodgerblue"
            {...register('password')}
          />
        </Form.Field>

        <div className="flex flex-col w-full gap-2 px-2">
          <div className="flex gap-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="p-2 w-full gap-1 flex transition-all items-center font-semibold justify-center hover:bg-blue-700 hover:text-white rounded-xl bg-blue-500"
            >
              <MdLogin />
              ENTRAR
            </button>
            <Link
              role="button"
              href="/reset_password"
              target="_blank"
              className="w-full gap-1 text-center font-semibold transition-all hover:bg-blue-500 hover:bg-opacity-50 flex items-center justify-center rounded-xl border-blue-500 border-[2px] text-blue-950 shadow-2xl"
            >
              ESQUECI A SENHA
            </Link>
          </div>
          <Link
            target="_blank"
            href={String(Environment.CUSTOMER_SERVICE_URL)}
            className="flex gap-2 items-center justify-center font-semibold w-full transition-colors text-blue-950 rounded-xl hover:bg-blue-700 hover:bg-opacity-50 p-2"
          >
            <MdSupportAgent className="text-2xl" />
            FALE CONOSCO
          </Link>
        </div>
      </form>
    </FormProvider>
  )
}
