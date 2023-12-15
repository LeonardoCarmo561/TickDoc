'use client'
import { GroupingsFormData, GroupingsFormProps } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createGrouping, updateGrouping } from '@/services'
import { groupingsFormSchema } from '@/utils/validation/ombudsman'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'
import { AutocompleteIcons } from './autocomplete-icons'
import { BaseSyntheticEvent } from 'react'
import { useAuthContext, useModuleContext } from '@/utils/hooks'

export function GroupingsForm(props: GroupingsFormProps) {
  const currentModule = useModuleContext()
  const { user } = useAuthContext()
  function handleClose() {
    reset()
    props.onClose()
  }

  const groupingsForm = useForm<GroupingsFormData>({
    resolver: zodResolver(groupingsFormSchema),
    defaultValues: props.create ? undefined : props.groupingData,
  })

  function submit(formData: GroupingsFormData) {
    if (props.create) {
      createGrouping(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Agrupamento criado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.groupingData) {
      updateGrouping(props.groupingData.id, formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Agrupamento atualizado com sucesso')
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
    control,
    reset,
    formState: { isSubmitting },
  } = groupingsForm

  return (
    <Form.ModalForm
      formTitle={props.create ? 'Novo Agrupamento' : 'Editar Agrupamento'}
      open={props.open}
      onClose={handleClose}
      formReturn={groupingsForm}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit={(e: BaseSyntheticEvent<object, any, any>) => {
        if (!props.create && props.groupingData) {
          setValue('institution_id', props.groupingData.institution_id)
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
      <div className="col-span-12 flex items-center justify-center">
        <Form.ErrorMessage field="institution_id" />
      </div>
      <div className="grid col-span-12 grid-cols-2 md:space-x-4">
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="name-field">Nome *</label>
          <input
            required
            id="name-field"
            placeholder="Digite o nome do agrupamento"
            className="w-full bg-inherit border border-zinc-500 rounded-xl p-2"
            {...register('name')}
          />
          <Form.ErrorMessage field="name" />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Controller
            name="icon"
            control={control}
            render={({ field: { value, onChange } }) => (
              <AutocompleteIcons onChange={onChange} value={value} />
            )}
          />
        </div>
      </div>

      <div className="col-span-12 flex items-center justify-center">
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
