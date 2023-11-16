import { TooltipProps } from '@/@types/tooltip'

export function Tooltip({ position = 'left', ...props }: TooltipProps) {
  const positionClass =
    position === 'bottom'
      ? 'top-full mt-0.5'
      : position === 'left'
      ? 'right-full mr-0.5'
      : position === 'rigth'
      ? 'left-full ml-0.5'
      : 'bottom-full mb-0.5'
  return (
    <span className="relative group/title" aria-hidden>
      {props.children}
      <span
        className={`rounded-md ${positionClass} hidden group-hover/title:block absolute text-xs p-1 bg-zinc-600 text-white z-50 sm:top-0 m-1`}
      >
        {props.title}
      </span>
    </span>
  )
}
