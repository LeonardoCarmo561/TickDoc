import { OptionProps } from '@/@types'

export function Option(props: OptionProps) {
  return (
    <li
      className="flex items-center justify-between list-none cursor-pointer"
      tabIndex={0}
      data-value={props.value}
      aria-label={props.label}
      data-type="option"
    >
      {props.icon}
      {props.label}
    </li>
  )
}
