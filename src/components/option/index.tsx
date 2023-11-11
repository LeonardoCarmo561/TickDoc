import { OptionProps } from '@/@types'
import { MdCheck } from 'react-icons/md'

export function Option(props: OptionProps) {
  return (
    <li
      className="
      [&:has(input:checked)]:bg-zinc-300 hover:bg-zinc-300
      dark:[&:has(input:checked)]:bg-zinc-700
      dark:hover:bg-zinc-700
      border-b-zinc-700
      border-b
      flex items-center gap-2 p-3
      relative first:rounded-t-xl last:rounded-b-xl
      [&:has(input:focus)]:outline [&:has(input:focus)]:outline-2 [&:has(input:focus)]:outline-blue-500
      [&:has(input:focus)]:border-b-0
      last:border-b-0
      "
    >
      <input
        type="radio"
        name="select-option"
        value={props.value}
        data-label={props.label}
        className="peer [all:unset] [position:absolute] [inset:0] [cursor:pointer]"
      />

      {props.icon}
      <span className="label text-black dark:text-white line-clamp-1">
        {props.label}
      </span>
      <span
        id="check-icon"
        className="ml-auto text-blue-500 hidden peer-checked:block"
      >
        <MdCheck />
      </span>
    </li>
  )
}
