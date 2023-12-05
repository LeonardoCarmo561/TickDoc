/* eslint-disable @typescript-eslint/no-explicit-any */
import { ManagersFormData, ManagersFormProps } from '@/@types'
import { Form, LoadingSpinner } from '@/components'
import { createAdminUser, updateAdminUser } from '@/services'
import { managersFormSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { SelectDocumentType } from './select-document-type'
import { MdCancel, MdSave } from 'react-icons/md'
import { BaseSyntheticEvent } from 'react'

export function ManagersForm(props: ManagersFormProps) {
  function handleClose() {
    reset()
    props.onClose()
  }

  const managerForm = useForm<ManagersFormData>({
    resolver: zodResolver(managersFormSchema),
    defaultValues: props.create
      ? { birth_date: '' }
      : {
          ...props.adminUserData,
          birth_date: props.adminUserData?.birth_date
            ? props.adminUserData.birth_date
            : '',
        },
  })

  function submit(formData: ManagersFormData) {
    if (props.create) {
      createAdminUser(formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Administrador(a) criado(a) com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    } else if (props.adminUserData) {
      updateAdminUser(props.adminUserData.id, formData).then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          alert('Administrador(a) atualizado(a) com sucesso')
          props.revalidate?.()
          handleClose()
        }
      })
    }
  }

  const {
    handleSubmit,
    control,
    getValues,
    register,
    reset,
    unregister,
    watch,
    formState: { isSubmitting },
  } = managerForm

  return (
    <Form.ModalForm
      formTitle={
        props.create ? 'Novo(a) Administrador(a)' : 'Editar Administrador(a)'
      }
      open={props.open}
      onClose={handleClose}
      formReturn={managerForm}
      handleSubmit={(e: BaseSyntheticEvent<object, any, any>) => {
        if (
          getValues().birth_date === undefined ||
          getValues().birth_date?.length === 0
        ) {
          console.log('registrando')
          unregister('birth_date')
        }
        return handleSubmit(submit)(e)
      }}
    >
      <div className="col-span-12">
        <label htmlFor="username-field">Nome *</label>
        <input
          required
          autoComplete="off"
          id="username-field"
          className="p-2 border border-zinc-500 rounded-xl w-full bg-inherit"
          placeholder="Digite o nome aqui"
          {...register('username')}
        />
        <Form.ErrorMessage field="username" />
      </div>

      <div className="grid col-span-12 grid-cols-2 md:space-x-4">
        <div className="flex col-span-2 md:col-span-1">
          <div className="flex flex-[1]">
            <Controller
              name="document_type"
              control={control}
              defaultValue={
                props.create
                  ? 1
                  : props.adminUserData
                  ? props.adminUserData.document_type
                  : 1
              }
              render={({ field: { onChange, value } }) => (
                <SelectDocumentType onChange={onChange} value={value} />
              )}
            />
          </div>
          <div className="flex flex-col flex-[2]">
            <label htmlFor="document_number-field">Documento *</label>
            <input
              required
              autoComplete="off"
              id="document_number-field"
              placeholder={
                watch('document_type') === 1
                  ? '123.456.789-01'
                  : '12.123.123/1234-12'
              }
              className="p-2 border border-zinc-500 rounded-r-xl w-full bg-inherit"
              {...register('document_number')}
            />
            <Form.ErrorMessage field="document_number" />
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label htmlFor="birth_date-field">Data de nascimento</label>
          <input
            autoComplete="off"
            id="birth_date-field"
            type="date"
            className="p-2 border border-zinc-500 rounded-lg w-full"
            {...register('birth_date')}
          />
          <Form.ErrorMessage field="birth_date" />
        </div>
      </div>

      <div className="col-span-12">
        <label htmlFor="email-field">E-mail *</label>
        <input
          required
          autoComplete="off"
          id="email-field"
          type="email"
          placeholder="email@exemplo.com"
          className="p-2 border border-zinc-500 rounded-xl w-full"
          {...register('email')}
        />
        <Form.ErrorMessage field="email" />
      </div>

      <div className="col-span-12 flex items-center justify-center">
        <label htmlFor="status-field">Status</label>
        <input id="status-field" type="checkbox" {...register('is_active')} />
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
