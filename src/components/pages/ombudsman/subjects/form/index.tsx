import { SubjectFormData, SubjectsFormProps } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createSubject, updateSubject } from '@/services'
import { useAuthContext, useModuleContext } from '@/utils/hooks'
import { workFieldFormSchema } from '@/utils/validation/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'

export function SubjectsForm(props: SubjectsFormProps) {
  const currentModule = useModuleContext()
  const { user } = useAuthContext()

  function handleClose() {
    reset()
    props.onClose()
  }

  const subjectForm = useForm<SubjectFormData>({
    resolver: zodResolver(workFieldFormSchema),
    defaultValues: props.create
      ? undefined
      : {
          ...props.subjectData,
          sectors: props.subjectData?.sectors.map((sector) => sector.id),
        },
  })

  function submit(formData: SubjectFormData) {
    if (props.create) {
      createSubject(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Assunto criado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.subjectData) {
      updateSubject(props.subjectData.id, formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Assunto atualizado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    }
  }

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { isSubmitting },
  } = subjectForm

  return (
    <Form.ModalForm
      formTitle={props.create ? 'Novo Assunto' : 'Editar Assunto'}
      open={props.open}
      onClose={handleClose}
      formReturn={subjectForm}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit={(e: BaseSyntheticEvent<object, any, any>) => {
        if (!props.create && props.subjectData) {
          setValue('institution_id', props.subjectData.institution_id)
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
      <div className="col-span-12 grid grid-cols-2 md:space-x-4 md:space-y-0 space-y-4">
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="name">Nome *</label>
          <input
            required
            type="text"
            placeholder="Digite o nome do assunto"
            className="bg-inherit border border-zinc-500 rounded-xl p-2 w-full"
            {...register('name')}
          />
          <Form.ErrorMessage field="name" />
        </div>

        <div className="col-span-2 md:col-span-1">
          <span>Em breve</span>
        </div>
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
