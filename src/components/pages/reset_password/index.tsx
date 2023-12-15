'use client'

import { ResetPasswordFormData } from '@/@types/reset-password'
import { Form } from '@/components'
import { resetPassword } from '@/services'
import { resetPasswordFormSchema } from '@/utils/validation/others'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'

export function ResetPasswordForm() {
  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  async function submit(formData: ResetPasswordFormData) {
    const result = await resetPassword(formData)

    if (result instanceof Error) return alert(result.message)

    alert(
      'Solicitação recebida com sucesso! Em alguns minutos, você recebrá um e-mail com as instruções para redefinição de senha',
    )
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = resetPasswordForm

  return (
    <FormProvider {...resetPasswordForm}>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-1 flex-col gap-2 w-full p-2 justify-center items-center"
      >
        <Form.Field>
          <Form.Label htmlFor="email">E-mail</Form.Label>
          <Form.Input name="email" placeholder="email@example.com" />
          <Form.ErrorMessage field="email" />
        </Form.Field>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-inherit border border-blue-500 w-fit p-2 text-blue-500 rounded-xl text-sm font-semibold flex items-center gap-1"
        >
          ENVIAR
          <span className="text-lg">
            <MdSend />
          </span>
        </button>
      </form>
    </FormProvider>
  )
}

// export function ResetPasswordTokenForm(props: { token: string }) {
//   const resetPasswordTokenForm = useForm<ResetPasswordTokenFormData>({
//     resolver: zodResolver(resetPasswordTokenFormSchema),
//   })

//   async function submit(formData: ResetPasswordTokenFormData) {
//     const result = await resetPasswordToken(formData)

//     if (result instanceof Error) return alert(result.message)

//     alert(
//       'Solicitação recebida com sucesso! Em alguns minutos, você recebrá um e-mail com as instruções para redefinição de senha',
//     )
//   }

//   return (
//     <FormProvider {...resetPasswordTokenForm}>
//       <form></form>
//     </FormProvider>
//   )
// }
