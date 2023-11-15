import { TooltipProps } from '@/@types/tooltip'

export function Tooltip({ position = 'left', ...props }: TooltipProps) {
  return (
    <span className="relative group/title" aria-hidden>
      {props.children}
      <span
        className={`rounded-md hidden ${position}-full group-hover/title:block absolute text-xs p-1 bg-zinc-600 text-white z-[500] sm:top-0 m-1`}
      >
        {props.title}
      </span>
    </span>
  )
}
