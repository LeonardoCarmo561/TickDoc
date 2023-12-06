import { ToastProps } from '@/@types'

export function Toast(props: ToastProps) {
  return (
    <div
      onClick={props.onClick}
      className="z-50 shadow-xl border border-zinc-300 dark:border-zinc-600 box-border w-80 h-24 p-3 bg-white dark:bg-black rounded-xl relative cursor-pointer after:content-['x'] after:absolute after:top-[-4px] after:right-1"
    >
      <span className="flex-wrap break-words">{props.message}</span>
    </div>
  )
}
