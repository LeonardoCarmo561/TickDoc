'use client'
import { ClientsFormData, ClientsFormProps } from '@/@types/clients-form'
import { Form } from '@/components'
import { Modal } from '@/components/modal'
import { clientsFormSchema } from '@/utils/validation/clients-form-validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatToCNPJ } from 'brazilian-values'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  MdCancel,
  MdConnectWithoutContact,
  MdDelete,
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
    watch,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = clientsForm

  const watchLogo = watch('logo')

  useEffect(() => {
    if (getValues().logo) {
      setLogoURL(URL.createObjectURL(getValues().logo[0]))
    }

    return () => {
      if (logoURL) URL.revokeObjectURL(logoURL)
    }
  }, [getValues, logoURL, watchLogo])

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="bg-white flex flex-col p-3 rounded-xl dark:bg-zinc-700 w-[90vw] max-w-7xl max-h-[85vh] overflow-auto divide-y divide-zinc-500">
        <h3 className="text-center text-xl font-semibold">
          {props.create ? 'Novo cliente' : 'Editar cliente'}
        </h3>

        <FormProvider {...clientsForm}>
          <form onSubmit={handleSubmit(submit)} className="p-2">
            <div className="grid space-y-4">
              {!watchLogo && (
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('input-logo')?.click()
                    }
                    className="flex gap-2 items-center justify-center w-[300px] bg-zinc-500 text-white rounded-xl"
                  >
                    <MdImage className="text-9xl" />
                    <span>Insira uma logo</span>
                  </button>
                </div>
              )}
              {watchLogo && logoURL && (
                <div className="flex flex-col gap-1 justify-center items-center">
                  <Image
                    alt="Client Logo"
                    src={logoURL}
                    width={500}
                    height={500}
                    className="max-w-[300px] h-auto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setValue('logo', undefined)
                    }}
                    className="rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 p-1 transition-colors"
                  >
                    <MdDelete className="w-7 h-7" />
                  </button>
                </div>
              )}
              <input type="file" id="input-logo" {...register('logo')} hidden />
              <Form.ErrorMessage field="logo" />
              <Form.Field>
                <Form.Label htmlFor="name">Título</Form.Label>
                <Form.Input
                  required
                  type="text"
                  name="name"
                  placeholder="Título da instituição"
                  className="bg-inherit text-black dark:text-white p-2 rounded-xl outline-none border border-zinc-500 focus:border-2 focus:border-blue-500"
                  maxLength={50}
                />
                <Form.ErrorMessage field="name" />
              </Form.Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4">
                <Form.Field>
                  <Form.Label htmlFor="cnpj">CNPJ</Form.Label>
                  <Form.Input
                    required
                    type="text"
                    name="cnpj"
                    mask={formatToCNPJ}
                    placeholder="01.001.001/0001-01"
                    className="bg-inherit text-black dark:text-white p-2 rounded-xl outline-none border border-zinc-500 focus:border-2 focus:border-blue-500"
                    maxLength={18}
                  />
                  <Form.ErrorMessage field="cnpj" />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="prefix">Sigla</Form.Label>
                  <Form.Input
                    required
                    type="text"
                    name="prefix"
                    mask={(value) => value.toUpperCase()}
                    placeholder="SIGLA-OV-1234567890"
                    className="bg-inherit text-black dark:text-white p-2 rounded-xl outline-none border border-zinc-500 focus:border-2 focus:border-blue-500"
                    maxLength={10}
                  />
                  <Form.ErrorMessage field="prefix" />
                </Form.Field>

                <Form.Field className="flex flex-col gap-1 w-full px-2 sm:col-span-3 md:col-span-1">
                  <Form.Label htmlFor="work_field">
                    Ramo de Atividades
                  </Form.Label>
                  <Form.Input
                    required
                    type="text"
                    name="work_field"
                    placeholder="Empresa de Tecnologia"
                    className="bg-inherit w-full text-black dark:text-white p-2 rounded-xl outline-none border border-zinc-500 focus:border-2 focus:border-blue-500"
                  />
                  <Form.ErrorMessage field="work_field" />
                </Form.Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <Form.Field>
                  <Form.Label htmlFor="address">Endereço</Form.Label>
                  <Form.Input
                    type="text"
                    name="address"
                    placeholder="Av. Júlio Abreu, Nº 160 - Sala 308 - Fortaleza/CE"
                    className="bg-inherit w-full text-black dark:text-white p-2 rounded-xl outline-none border border-zinc-500 focus:border-2 focus:border-blue-500"
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Label htmlFor="modules">Módulos</Form.Label>
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
                </Form.Field>
              </div>

              <div className="flex flex-1 justify-center items-center">
                <Form.Field className="flex items-center justify-center gap-1 w-full px-2">
                  <Form.Input
                    type="checkbox"
                    name="status"
                    className="block w-4 h-4"
                  />
                  <Form.Label htmlFor="status" className="text-xl">
                    Status
                  </Form.Label>
                </Form.Field>
              </div>
            </div>

            {watch('modues') && getValues('modues').includes('ombudsman') && (
              <span>Tem Ouvidoria</span>
            )}

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
