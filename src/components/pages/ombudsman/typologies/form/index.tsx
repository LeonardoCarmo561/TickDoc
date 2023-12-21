import { TypologiesFormData, TypologiesFormProps } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createTypology, updateTypology } from '@/services'
import { useAuthContext, useModuleContext } from '@/utils/hooks'
import { typologiesFormSchema } from '@/utils/validation/ombudsman'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'

export function TypologiesForm(props: TypologiesFormProps) {
  const currentModule = useModuleContext()
  const { user } = useAuthContext()

  function handleClose() {
    reset()
    props.onClose()
  }

  const typologyForm = useForm<TypologiesFormData>({
    resolver: zodResolver(typologiesFormSchema),
    defaultValues: props.typologyData,
  })

  function submit(formData: TypologiesFormData) {
    if (props.create) {
      createTypology(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Tipologia criada com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.typologyData) {
      updateTypology(props.typologyData.id, formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Tipologia atualizada com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    }
  }

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { isSubmitting },
  } = typologyForm

  return (
    <Form.ModalForm
      formTitle={props.create ? 'Nova Tipologia' : 'Editar Tipologia'}
      open={props.open}
      onClose={handleClose}
      formReturn={typologyForm}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit={(e: BaseSyntheticEvent<object, any, any>) => {
        if (!props.create && props.typologyData) {
          setValue('institution_id', props.typologyData.institution_id)
        } else if (
          currentModule &&
          currentModule.profile !== 0 &&
          props.create
        ) {
          setValue('institution_id', Number(user?.institutionId))
        } else if (currentModule && currentModule.profile === 0) {
          setValue('institution_id', Number(user?.institutionId))
        }
        return handleSubmit(submit)(e)
      }}
    >
      <div className="col-span-12">
        <label htmlFor="name">Nome *</label>
        <input
          required
          type="text"
          className="bg-inherit border border-zinc-500 rounded-xl p-2 w-full"
          {...register('name')}
        />
        <Form.ErrorMessage field="name" />
      </div>

      <div className="col-span-12 flex items-center justify-center gap-1">
        <label htmlFor="status-field">Status</label>
        <input id="status-field" type="checkbox" {...register('status')} />
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
