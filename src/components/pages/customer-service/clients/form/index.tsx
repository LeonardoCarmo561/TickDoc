import { ClientsFormData, ClientsFormProps } from '@/@types/clients-form'
import { Form } from '@/components'
import { Modal } from '@/components/modal'
import { clientsFormSchema } from '@/utils/validation/clients-form-validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export function ClientsForm(props: ClientsFormProps) {
  function handleClose() {
    props.onClose?.()
  }

  const clientsForm = useForm<ClientsFormData>({
    resolver: zodResolver(clientsFormSchema),
  })

  async function submit(formData: ClientsFormData) {
    console.log(formData)
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = clientsForm

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className="bg-white p-3 rounded-xl dark:bg-zinc-700 w-[90vw] max-w-7xl max-h-[85vh] overflow-auto divide-y divide-zinc-500">
        <h3 className="text-center text-xl font-semibold">
          {props.create ? 'Novo cliente' : 'Editar cliente'}
        </h3>

        <FormProvider {...clientsForm}>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid">
              <Form.Field>
                <Form.Label htmlFor="ombudsman_title">Título</Form.Label>
                <Form.Input type="text" name="ombudsman_title" />
                <Form.ErrorMessage field="ombudsman_title" />
              </Form.Field>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  )
}
