import { WorkFieldsFormData, WorkfFieldsFormProps } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createWorkField, updateWorkField } from '@/services'
import { workFieldFormSchema } from '@/utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'

export function WorkfFieldsForm(props: WorkfFieldsFormProps) {
  function handleClose() {
    reset()
    props.onClose()
  }

  const workFieldForm = useForm<WorkFieldsFormData>({
    resolver: zodResolver(workFieldFormSchema),
    defaultValues: props.workFieldData,
  })

  function submit(formData: WorkFieldsFormData) {
    if (props.create) {
      createWorkField(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Ramo de atividade criado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.workFieldData) {
      updateWorkField(props.workFieldData.id, formData).then((res) => {
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
    register,
    reset,
    formState: { isSubmitting },
  } = workFieldForm

  return (
    <Form.ModalForm
      formTitle={
        props.create ? 'Novo Ramo de Atividade' : 'Editar Ramo de Atividade'
      }
      open={props.open}
      onClose={handleClose}
      formReturn={workFieldForm}
      handleSubmit={handleSubmit(submit)}
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
