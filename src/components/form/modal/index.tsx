import { ModalFormProps } from '@/@types'
import { Modal } from '@/components'
import { FormProvider } from 'react-hook-form'

export function ModalForm(props: ModalFormProps) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className="bg-white flex flex-col p-3 rounded-xl dark:bg-zinc-700 w-[90vw] max-w-7xl max-h-[85vh] overflow-auto divide-y divide-zinc-500">
        <h3 className="text-center text-xl font-semibold">{props.formTitle}</h3>

        <FormProvider {...props.formReturn}>
          <form
            onSubmit={props.handleSubmit(props.submit)}
            className="p-2 divide-y divide-zinc-500"
          >
            <div className="grid grid-cols-12 space-y-4 space-x-2">
              {props.children}
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  )
}
