import { IconsFormData, IconsFormProps } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createIcon, updateIcon } from '@/services'
import { iconsFormSchema } from '@/utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'

export function IconsForm(props: IconsFormProps) {
  function handleClose() {
    reset()
    props.onClose()
  }

  const iconsForm = useForm<IconsFormData>({
    resolver: zodResolver(iconsFormSchema),
    defaultValues:
      !props.create && props.iconData ? props.iconData : { icon: undefined },
  })

  function submit(formData: IconsFormData) {
    if (props.create) {
      createIcon(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Ramo de atividade criado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.iconData) {
      updateIcon(props.iconData.id, formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Ramo de atividade atualizado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    }
  }

  const {
    handleSubmit,
    getValues,
    register,
    reset,
    unregister,
    formState: { isSubmitting },
  } = iconsForm

  return (
    <Form.ModalForm
      formTitle={props.create ? 'Novo Ícone' : 'Editar Ícone'}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit={(e: BaseSyntheticEvent<object, any, any>) => {
        if (getValues().icon.length === 0 && !props.create) {
          unregister('icon')
        }
        return handleSubmit(submit)(e)
      }}
      formReturn={iconsForm}
      open={props.open}
      onClose={handleClose}
    >
      <div className="col-span-12 flex flex-col items-center justify-center">
        <input hidden type="file" id="icon-field" {...register('icon')} />
        <button
          type="button"
          onClick={() => document.getElementById('icon-field')?.click()}
          className="p-2 rounded-xl text-white bg-blue-500"
        >
          Inserir Ícone
        </button>
        <Form.ErrorMessage field="icon" />
      </div>

      <div className="col-span-12">
        <label htmlFor="name-field">Nome *</label>
        <input
          id="name-field"
          autoComplete="off"
          placeholder="Digite o nome do ícone"
          className="p-2 bg-inherit w-full rounded-xl border border-zinc-500"
          {...register('name')}
        />
        <Form.ErrorMessage field="name" />
      </div>

      <div className="col-span-12 flex flex-col items-center justify-center gap-1">
        <label>
          Status
          <input id="status-field" type="checkbox" {...register('status')} />
        </label>
        <Form.ErrorMessage field="status" />
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
