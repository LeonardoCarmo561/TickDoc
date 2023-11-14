import { TooltipProps } from '@/@types/tooltip'

export function Tooltip(props: TooltipProps) {
  return (
    <a className="relative group/title" aria-hidden>
      {props.children}
      <span className="rounded-md hidden group-hover/title:block absolute text-xs p-1 bg-zinc-600 text-white z-[500] top-full sm:right-full sm:top-0 m-1">
        {props.title}
      </span>
    </a>
  )
}
