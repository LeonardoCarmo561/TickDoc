'use client'
import { ClientsFormData, ClientsFormProps } from '@/@types/clients-form'
import { Form } from '@/components'
import { Modal } from '@/components/modal'
import { updateClient } from '@/services/clients-services'
import { clientsFormSchema } from '@/utils/validation/clients-form-validate'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { MdAddCircle, MdCancel, MdRemoveCircle, MdSave } from 'react-icons/md'
import { AutocompleteWorkfields } from './autocomplete-workfields'

export function ClientsForm(props: ClientsFormProps) {
  const clientsForm = useForm<ClientsFormData>({
    resolver: zodResolver(clientsFormSchema),
    defaultValues: props.create
      ? undefined
      : props.clientData && props.clientData.work_field
      ? {
          ...props.clientData,
          work_field: Number(
            (props.clientData?.work_field as { id: number }).id,
          ),
          sms_quantity: String(props.clientData?.sms_quantity),
        }
      : undefined,
  })

  const {
    reset,
    watch,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = clientsForm

  const {
    fields: fieldPhones,
    append: appendPhones,
    remove: removePhones,
  } = useFieldArray({
    control,
    name: 'phones',
  })

  const {
    fields: fieldCellphones,
    append: appendCellphones,
    remove: removeCellphones,
  } = useFieldArray({
    control,
    name: 'cellphones',
  })

  function addNewPhone() {
    appendPhones({ number: '', title: '' })
  }

  function removePhone(index: number) {
    removePhones(index)
  }

  function addNewCellhone() {
    appendCellphones({ number: '', title: '' })
  }

  function removeCellPhone(index: number) {
    removeCellphones(index)
  }

  const watchModules = watch('modules')
  const watchActivateSms = watch('activate_sms')

  function handleClose() {
    reset()
    props.onClose?.()
  }

  async function submit(formData: ClientsFormData) {
    if (props.clientData && !props.create) {
      console.log(formData)
      updateClient(props.clientData.id, formData).then((result) => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          alert('Deu tudo certo')
        }
      })
    }
  }

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="bg-white flex flex-col p-3 rounded-xl dark:bg-zinc-700 w-[90vw] max-w-7xl max-h-[85vh] overflow-auto divide-y divide-zinc-500">
        <h3 className="text-center text-xl font-semibold">
          {props.create ? 'Novo cliente' : 'Editar cliente'}
        </h3>

        <FormProvider {...clientsForm}>
          <form
            onSubmit={handleSubmit(submit)}
            className="p-2 divide-y divide-zinc-500"
          >
            <div className="grid grid-cols-12 space-y-4 space-x-2">
              <h4 className="font-semibold text-lg col-span-12">Instituição</h4>

              <div className="col-span-12">
                <label htmlFor="name">Nome da Instituição *</label>
                <input
                  id="name"
                  required
                  maxLength={50}
                  placeholder="Rede Participar Brasil de Tecnologia"
                  {...register('name')}
                  className="bg-inherit p-2 border border-zinc-500 rounded-xl w-full"
                />
                <Form.ErrorMessage field="name" />
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                <label htmlFor="cnpj" className="text-sm">
                  CNPJ *
                </label>
                <input
                  required
                  id="cnpj"
                  maxLength={18}
                  placeholder="01.001.001/0001-00"
                  className="w-full bg-inherit border border-zinc-500 rounded-xl p-2"
                  {...register('cnpj')}
                />
                <Form.ErrorMessage field="cnpj" />
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                <label htmlFor="prefix" className="text-sm">
                  Prefixo *
                </label>
                <input
                  required
                  id="prefix"
                  className="w-full bg-inherit border border-zinc-500 rounded-xl p-2"
                  placeholder="PREFIXO-OV-0123456789"
                  {...register('prefix')}
                />
                <Form.ErrorMessage field="prefix" />
              </div>
              <div className="col-span-12 md:col-span-4">
                <Controller
                  name="work_field"
                  control={control}
                  defaultValue={
                    !props.create &&
                    props.clientData &&
                    props.clientData.work_field
                      ? (props.clientData.work_field as { id: number }).id
                      : undefined
                  }
                  render={({ field: { onChange, value } }) => (
                    <AutocompleteWorkfields onChange={onChange} value={value} />
                  )}
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="prefix" className="text-sm">
                  Endereço
                </label>
                <input
                  id="prefix"
                  className="w-full bg-inherit border border-zinc-500 rounded-xl p-2"
                  placeholder="Av. Júlio Abreu 160, Sala 308 - Fortaleza/CE"
                  {...register('address')}
                />
                <Form.ErrorMessage field="address" />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="modules">Módulos</label>
                <select
                  multiple
                  {...register('modules')}
                  id="modules"
                  className="w-full p-2 rounded-xl border border-zinc-500 bg-inherit"
                >
                  <option value="ombudsman">Ouvidoria</option>
                  <option value="ci">Com. Interna</option>
                </select>
                <Form.ErrorMessage field="modules" />
              </div>

              <div
                id="status-field"
                className="col-span-12 flex items-center justify-center gap-2"
              >
                <label htmlFor="status">Status</label>
                <input {...register('status')} type="checkbox" />
                <Form.ErrorMessage field="status" />
              </div>
            </div>

            {watchModules && watchModules.includes('ombudsman') && (
              <div className="grid grid-cols-12 space-y-4 space-x-2 my-2">
                <h4 className="font-semibold text-lg col-span-12">
                  Módulo de Ouvidoria
                </h4>

                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="ombudsman_title">Título *</label>
                  <input
                    required={
                      watchModules && watchModules.includes('ombudsman')
                    }
                    id="ombudsman_title"
                    placeholder="Ouvidoria Parlamentar"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('ombudsman_title')}
                  />
                  <Form.ErrorMessage field="ombudsman_title" />
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="ombudsman_email">E-mail de Contato</label>
                  <input
                    id="ombudsman_email"
                    placeholder="ouvidoria@exemplo.com"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('ombudsman_email')}
                  />
                  <Form.ErrorMessage field="ombudsman_email" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <label htmlFor="slug">Slug</label>
                  <input
                    id="slug"
                    placeholder="https://tickdoc.com.br/ouvidoria/slug/login"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('slug')}
                  />
                  <Form.ErrorMessage field="slug" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <label htmlFor="contact_name">Ouvidor Responsável</label>
                  <input
                    id="contact_name"
                    placeholder="Jackson Pereira"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('contact_name')}
                  />
                  <Form.ErrorMessage field="contact_name" />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label htmlFor="working_hour">Horário de Funcionamento</label>
                  <input
                    id="working_hour"
                    placeholder="Segunda à Sexta - 08:00h às 17:00h"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('working_hour')}
                  />
                  <Form.ErrorMessage field="working_hour" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <label htmlFor="ombudsman_plan">Tipo de Plano</label>
                  <select
                    id="ombudsan_plan"
                    {...register('ombudsan_plan')}
                    className="bg-inherit rounded-xl p-2 border border-zinc-500 w-full h-10"
                  >
                    <option value={1}>Gratuito</option>
                    <option value={2}>Pago</option>
                  </select>
                  <Form.ErrorMessage field="ombudsman_plan" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <label htmlFor="client_type">Tipo de Cliente</label>
                  <select
                    id="client_type"
                    {...register('client_type')}
                    className="bg-inherit rounded-xl p-2 border border-zinc-500 w-full h-10"
                  >
                    <option value={1}>Público</option>
                    <option value={2}>Privado</option>
                  </select>
                  <Form.ErrorMessage field="client_type" />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label htmlFor="ombudsman_expires_at">Expira em</label>
                  <input
                    id="ombudsman_expires_at"
                    type="date"
                    className="px-2 h-10 w-full border border-zinc-500 rounded-xl"
                    {...register('ombudsman_expires_at')}
                  />
                  <Form.ErrorMessage field="ombudsman_expires_at" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-12">
                  <label htmlFor="separator_ov">Separador</label>
                  <input
                    className="p-2 w-full border border-zinc-500 rounded-xl"
                    placeholder="PREFIXO-SEPARADOR-0123456789"
                    {...register('separator_ov')}
                  />
                  <Form.ErrorMessage field="separator_ov" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4 flex items-center justify-center gap-2">
                  <label htmlFor="general_informations">
                    Informações Gerais
                  </label>
                  <input
                    id="general_informations"
                    type="checkbox"
                    {...register('general_informations')}
                  />
                  <Form.ErrorMessage field="general_information" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4 flex items-center justify-center gap-2">
                  <label htmlFor="anonymous">Manifestações Anônimas</label>
                  <input
                    id="anonymous"
                    type="checkbox"
                    {...register('anonymous')}
                  />
                  <Form.ErrorMessage field="anonymous" />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4 flex items-center justify-center gap-2">
                  <label htmlFor="general_informations">
                    Informações Gerais
                  </label>
                  <input
                    id="general_informations"
                    type="checkbox"
                    {...register('general_informations')}
                  />
                  <Form.ErrorMessage field="general_information" />
                </div>

                <div className="col-span-12 sm:col-span-6 flex items-center justify-center gap-2">
                  <label htmlFor="notify_sectors">Ouvidoria Automática</label>
                  <input
                    id="notify_sectors"
                    type="checkbox"
                    {...register('notify_sectors')}
                  />
                  <Form.ErrorMessage field="notify_sectors" />
                </div>

                <div className="col-span-12 sm:col-span-6 flex items-center justify-center gap-2">
                  <label htmlFor="activate_sms">Ativar SMS</label>
                  <input
                    id="activate_sms"
                    type="checkbox"
                    {...register('activate_sms')}
                  />
                  <Form.ErrorMessage field="activate_sms" />
                </div>

                {watchActivateSms && (
                  <div className="col-span-12">
                    <label htmlFor="sms_quantity">Quantidade de SMS</label>
                    <input
                      id="sms_quantity"
                      type="number"
                      placeholder="500"
                      className="p-2 w-full rounded-xl border border-zinc-500"
                      {...register('sms_quantity')}
                    />
                    <Form.ErrorMessage field="sms_quantity" />
                  </div>
                )}

                <div className="col-span-12 flex flex-col gap-2">
                  <span className="flex items-center justify-between font-semibold">
                    Telefones
                    <button
                      type="button"
                      onClick={addNewPhone}
                      className="text-sm p-2 bg-blue-500 rounded-xl text-white flex gap-1 items-center justify-center w-fit"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      Adicionar Telefone
                    </button>
                  </span>
                  {fieldPhones.map((field, index) => (
                    <div key={field.id} className="flex">
                      <div className="w-full">
                        <label htmlFor={`phones.${index}.title`}>Título</label>
                        <input
                          id={`phones.${index}.title`}
                          className="p-2 border border-zinc-500 rounded-l-xl w-full"
                          {...register(`phones.${index}.title`)}
                          placeholder="Título"
                          required={index > 0}
                        />
                        <Form.ErrorMessage field={`phones.${index}.title`} />
                      </div>
                      <div className="w-full">
                        <label htmlFor={`phones.${index}.number`}>Número</label>
                        <input
                          id={`phones.${index}.number`}
                          className="p-2 border border-zinc-500 rounded-r-xl w-full"
                          {...register(`phones.${index}.number`)}
                          placeholder="(85) 3333-3333"
                          required={index > 0}
                        />
                        <Form.ErrorMessage field={`phones.${index}.number`} />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-red-500 ml-1 p-1 rounded-full focus:bg-zinc-500 focus:bg-opacity-30 hover:bg-zinc-500 hover:bg-opacity-30"
                          onClick={() => removePhone(index)}
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="col-span-12 flex flex-col gap-2">
                  <span className="flex items-center justify-between font-semibold">
                    Celulares
                    <button
                      type="button"
                      onClick={addNewCellhone}
                      className="text-sm p-2 bg-blue-500 rounded-xl text-white flex gap-1 items-center justify-center w-fit"
                    >
                      <MdAddCircle className="w-5 h-5" />
                      Adicionar Celular
                    </button>
                  </span>
                  {fieldCellphones.map((field, index) => (
                    <div key={field.id} className="flex">
                      <div className="w-full">
                        <label htmlFor={`cellphones.${index}.title`}>
                          Título
                        </label>
                        <input
                          id={`phones.${index}.title`}
                          className="p-2 border border-zinc-500 rounded-l-xl w-full"
                          {...register(`cellphones.${index}.title`)}
                          placeholder="Título"
                          required={index > 0}
                        />
                        <Form.ErrorMessage
                          field={`cellphones.${index}.title`}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor={`cellphones.${index}.number`}>
                          Número
                        </label>
                        <input
                          id={`cellphones.${index}.number`}
                          className="p-2 border border-zinc-500 rounded-r-xl w-full"
                          {...register(`cellphones.${index}.number`)}
                          placeholder="(85) 98888-3333"
                          required={index > 0}
                        />
                        <Form.ErrorMessage
                          field={`cellphones.${index}.number`}
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-red-500 ml-1 p-1 rounded-full focus:bg-zinc-500 focus:bg-opacity-30 hover:bg-zinc-500 hover:bg-opacity-30"
                          onClick={() => removeCellPhone(index)}
                        >
                          <MdRemoveCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              id="buttons"
              className="flex flex-1 items-center justify-center gap-2 pt-4"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 flex items-center justify-center text-white rounded-xl bg-blue-500 gap-1 transition-colors hover:bg-blue-700 disabled:text-zinc-300 disabled:bg-zinc-600"
              >
                <MdSave className="text-xl" />
                ENVIAR
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
          </form>
        </FormProvider>
      </div>
    </Modal>
  )
}
