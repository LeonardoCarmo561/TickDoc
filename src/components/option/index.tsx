import { OptionProps } from '@/@types'

export function Option(props: OptionProps) {
  return (
    <li
      className="flex items-center justify-between list-none cursor-pointer"
      title={props.title}
      tabIndex={0}
      data-value={props.value}
      aria-label={props.label}
      data-type="option"
    >
      <div
        className="flex items-center gap-2 p-2"
        data-value={props.value}
        aria-label={props.label}
        data-type="option"
      >
        <span
          className="text-2xl"
          data-value={props.value}
          aria-label={props.label}
          data-type="option"
        >
          {props.icon}
        </span>
        <span
          className="text-base"
          data-value={props.value}
          aria-label={props.label}
          data-type="option"
        >
          {props.label}
        </span>
      </div>
    </li>
  )
}
