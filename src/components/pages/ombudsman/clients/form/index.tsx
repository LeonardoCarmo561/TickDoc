'use client'
import { ClientsFormData, ClientsFormProps } from '@/@types/clients-form'
import { Form } from '@/components'
import { Modal } from '@/components/modal'
import { clientsFormSchema } from '@/utils/validation/clients-form-validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatToCNPJ } from 'brazilian-values'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  MdCancel,
  MdConnectWithoutContact,
  MdImage,
  MdSave,
  MdSupportAgent,
} from 'react-icons/md'

export function ClientsForm(props: ClientsFormProps) {
  const [logoURL, setLogoURL] = useState<string>()

  function handleClose() {
    reset()
    props.onClose?.()
  }

  const clientsForm = useForm<ClientsFormData>({
    resolver: zodResolver(clientsFormSchema),
  })

  async function submit(formData: ClientsFormData) {
    console.log(formData)
  }

  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = clientsForm

  useEffect(() => {
    if (getValues().logo) {
      setLogoURL(URL.createObjectURL(getValues().logo[0]))
    }

    return () => {
      if (logoURL) URL.revokeObjectURL(logoURL)
    }
  }, [getValues, logoURL])

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="bg-white flex flex-col p-3 rounded-xl dark:bg-zinc-700 w-[90vw] max-w-7xl max-h-[85vh] overflow-auto divide-y divide-zinc-500">
        <h3 className="text-center text-xl font-semibold">
          {props.create ? 'Novo cliente' : 'Editar cliente'}
        </h3>

        <FormProvider {...clientsForm}>
          <form onSubmit={handleSubmit(submit)} className="p-2">
            <div className="grid grid-cols-12 space-y-4">
              <div className="col-span-12 flex items-center justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center bg-blue-500 rounded-xl p-2 gap-2 text-xl text-white"
                  onClick={() => document.getElementById('logo-input')?.click()}
                >
                  <MdImage />
                  <span>Inserir logo</span>
                </button>
                <input
                  required
                  id="logo-input"
                  type="file"
                  hidden
                  {...register('logo')}
                />
                <Form.ErrorMessage field="logo" />
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                <label htmlFor="cnpj" className="text-sm">
                  CNPJ
                </label>
                <Form.Input
                  name="cnpj"
                  required
                  className="w-full bg-inherit border border-zinc-500 rounded-xl p-2"
                  placeholder="01.001.001/0001-00"
                  maxLength={18}
                  mask={(e) => formatToCNPJ(e || '')}
                />
                <Form.ErrorMessage field="cnpj" />
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                <label htmlFor="prefix" className="text-sm">
                  Prefixo
                </label>
                <input
                  id="prefix"
                  className="w-full bg-inherit border border-zinc-500 rounded-xl p-2"
                  placeholder="PREFIXO-OV-0123456789"
                  {...register('prefix')}
                />
                <Form.ErrorMessage field="prefix" />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label htmlFor="prefix" className="text-sm">
                  Ramo de atividade
                </label>
                <Form.Select
                  name="work_field"
                  placeholder="Selecione um ramo de atividade"
                  options={[
                    {
                      label: 'Tecnologia',
                      value: 1,
                    },
                    {
                      label: 'Sistema S',
                      value: 2,
                    },
                    {
                      label: 'Assembleia Legislativa',
                      value: 3,
                    },
                  ]}
                />
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
                <Form.Select
                  closeOnChange={false}
                  multiple
                  name="modules"
                  options={[
                    {
                      label: 'Ouvidoria',
                      value: 'ombudsman',
                      icon: <MdSupportAgent />,
                    },
                    {
                      label: 'Com. Interna',
                      value: 'ci',
                      icon: <MdConnectWithoutContact />,
                    },
                  ]}
                />
                <Form.ErrorMessage field="modules" />
              </div>

              <div
                id="status-field"
                className="col-span-12 flex items-center justify-center"
              >
                <span className="text-center">Aqui é o status</span>
              </div>
            </div>

            <div
              id="buttons"
              className="flex flex-1 items-center justify-center gap-2 mt-2"
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
