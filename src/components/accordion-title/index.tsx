import { AccordionTitleProps } from '@/@types'
import { LoadingSpinner } from '..'

export function AccordionTitle(props: AccordionTitleProps) {
  return (
    <div className="flex gap-1 items-center">
      {props.icon}
      <h3 className="text-lg font-semibold">{props.title}</h3>
      {props.isLoading && <LoadingSpinner height="h-6" width="w-6" />}
    </div>
  )
}
