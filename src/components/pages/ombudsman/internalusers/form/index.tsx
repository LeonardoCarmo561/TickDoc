import { InternalUsersFormProps, InternalUsersFormData } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createInternalUser, updateInternalUser } from '@/services'
import { internalUsersFormSchema } from '@/utils/validation/ombudsman'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'
import { SelectModules } from './select-modules'

export function InternalUsersForm(props: InternalUsersFormProps) {
  function handleClose() {
    reset()
    props.onClose()
  }

  const workFieldForm = useForm<InternalUsersFormData>({
    resolver: zodResolver(internalUsersFormSchema),
    defaultValues: props.create ? { modules: [] } : props.internalUserData,
  })

  function submit(formData: InternalUsersFormData) {
    if (props.create) {
      createInternalUser(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Usuário criado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.internalUserData) {
      updateInternalUser(props.internalUserData.id, formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Usuário atualizado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    }
  }

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting },
  } = workFieldForm

  return (
    <Form.ModalForm
      formTitle={props.create ? 'Novo Usuário' : 'Editar Usuário'}
      open={props.open}
      onClose={handleClose}
      formReturn={workFieldForm}
      handleSubmit={handleSubmit(submit)}
    >
      <div className="col-span-12">
        <label htmlFor="name-input">Nome *</label>
        <input
          required
          id="name-input"
          type="text"
          placeholder="Insira o nome aqui"
          className="bg-inherit border border-zinc-500 rounded-xl p-2 w-full"
          {...register('username')}
        />
        <Form.ErrorMessage field="name" />
      </div>

      <div className="col-span-12">
        <label htmlFor="email-field">E-mail *</label>
        <input
          required
          id="email-field"
          type="email"
          placeholder="email@exemplo.com"
          className="bg-inherit border border-zinc-500 rounded-xl p-2 w-full"
          {...register('email')}
        />
      </div>

      <div className="col-span-12">
        <Controller
          name="modules"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectModules onChange={onChange} value={value} />
          )}
        />
        <input
          className="bg-inherit border border-zinc-500 rounded-xl p-2 w-full"
          {...register('document_number')}
        />
      </div>

      <div
        id="buttons"
        className="flex flex-1 items-center justify-center gap-2 pt-4 col-span-12"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2 flex items-center justify-center text-white rounded-xl bg-blue-500 gap-1 transition-colors hover:bg-blue-700 disabled:text-zinc-300 disabled:bg-zinc-600"
        >
          {isSubmitting ? (
            <LoadingSpinner height="h-4" width="w-4" />
          ) : (
            <MdSave className="text-xl" />
          )}
          {isSubmitting ? 'Enviando...' : 'ENVIAR'}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="p-2 flex text-blue-500 items-center justify-center rounded-xl border border-blue-500 gap-1 transition-colors hover:bg-blue-700 hover:bg-opacity-25"
        >
          <MdCancel className="text-xl" />
          CANCELAR
        </button>
      </div>
    </Form.ModalForm>
  )
}
