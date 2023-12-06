import { ToastContainerProps } from '@/@types'

export function ToastContainer(props: ToastContainerProps) {
  return (
    <div className="flex flex-col gap-1 fixed m-2 top-0 right-0">
      {props.children}
    </div>
  )
}
