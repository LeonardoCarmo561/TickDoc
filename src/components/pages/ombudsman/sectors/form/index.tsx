import { SectorsFormData, SectorsFormProps } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createSector, updateSector } from '@/services'
import { sectorsFormSchema } from '@/utils/validation/ombudsman'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'
import { AutocompleteGroupings } from './autocomplete-groupings'
import { BaseSyntheticEvent } from 'react'
import { useAuthContext, useModuleContext } from '@/utils/hooks'

export function SectorsForm(props: SectorsFormProps) {
  const currentModule = useModuleContext()
  const { user } = useAuthContext()

  function handleClose() {
    reset()
    props.onClose()
  }

  const sectorForm = useForm<SectorsFormData>({
    resolver: zodResolver(sectorsFormSchema),
    defaultValues: {
      ...props.sectorData,
      grouping_id: props.sectorData?.grouping_id
        ? props.sectorData?.grouping_id.id
        : undefined,
    },
  })

  function submit(formData: SectorsFormData) {
    if (props.create) {
      createSector(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Setor criado com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.sectorData) {
      updateSector(props.sectorData.id, formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Setor atualizado com sucesso')
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
  } = sectorForm

  return (
    <Form.ModalForm
      formTitle={props.create ? 'Novo Setor' : 'Editar Setor'}
      open={props.open}
      onClose={handleClose}
      formReturn={sectorForm}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit={(e: BaseSyntheticEvent<object, any, any>) => {
        if (!props.create && props.sectorData) {
          setValue('institution_id', props.sectorData.institution_id)
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
          <label htmlFor="name-field">Nome *</label>
          <input
            required
            type="text"
            id="name-field"
            placeholder="Digite o nome do setor"
            className="bg-inherit border border-zinc-500 rounded-xl p-2 w-full"
            {...register('name')}
          />
          <Form.ErrorMessage field="name" />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Controller
            control={control}
            name="grouping_id"
            render={({ field: { value, onChange } }) => (
              <AutocompleteGroupings onChange={onChange} value={value} />
            )}
          />
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
