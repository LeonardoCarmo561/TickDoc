'use client'
import { ClientsFormData, ClientsFormProps } from '@/@types/clients-form'
import { Form } from '@/components'
import { Modal } from '@/components/modal'
import { clientsFormSchema } from '@/utils/validation/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { MdCancel, MdSave } from 'react-icons/md'

export function ClientsForm(props: ClientsFormProps) {
  const clientsForm = useForm<ClientsFormData>({
    resolver: zodResolver(clientsFormSchema),
  })

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = clientsForm

  const watchModules = watch('modules')

  function handleClose() {
    reset()
    props.onClose?.()
  }

  async function submit(formData: ClientsFormData) {
    console.log(formData)
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
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                <label htmlFor="cnpj" className="text-sm">
                  CNPJ *
                </label>
                <Form.Input
                  name="cnpj"
                  required
                  className="w-full bg-inherit border border-zinc-500 rounded-xl p-2"
                  placeholder="01.001.001/0001-00"
                  maxLength={18}
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
                <label htmlFor="work_field" className="text-sm">
                  Ramo de atividade *
                </label>
                <select
                  {...register('work_field')}
                  required
                  className="w-full p-2 h-10 border border-zinc-500 rounded-xl"
                >
                  <option value={1} className="">
                    Tecnologia
                  </option>
                  <option value={1} className="">
                    Sistema S
                  </option>
                  <option value={1} className="">
                    Assembleia Legislativa
                  </option>
                </select>
                <Form.ErrorMessage field="work_field" />
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
                  className="w-full p-2 rounded-xl border border-zinc-500"
                >
                  <option value="ombudsman">Ouvidoria</option>
                  <option value="ci">Com. Interna</option>
                </select>
                <Form.ErrorMessage field="modules" />
              </div>

              <div
                id="status-field"
                className="col-span-12 flex items-center justify-center"
              >
                <label htmlFor="status">Status</label>
                <input {...register('status')} type="checkbox" />
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
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="ombudsman_email">E-mail de Contato</label>
                  <input
                    id="ombudsman_email"
                    placeholder="ouvidoria@exemplo.com"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('ombudsman_email')}
                  />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <label htmlFor="slug">Slug</label>
                  <input
                    id="slug"
                    placeholder="https://tickdoc.com.br/ouvidoria/slug/login"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('slug')}
                  />
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                  <label htmlFor="contact_name">Ouvidor Responsável</label>
                  <input
                    id="contact_name"
                    placeholder="Jackson Pereira"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('contact_name')}
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label htmlFor="working_hour">Horário de Funcionamento</label>
                  <input
                    id="working_hour"
                    placeholder="Segunda à Sexta - 08:00h às 17:00h"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('working_hour')}
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label htmlFor="working_hour">Horário de Funcionamento</label>
                  <input
                    id="working_hour"
                    placeholder="Segunda à Sexta - 08:00h às 17:00h"
                    className="p-2 bg-inherit border border-zinc-500 rounded-xl w-full"
                    {...register('working_hour')}
                  />
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
