import { SelectProps } from '@/@types'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

export function Select(props: SelectProps) {
  return (
    <div
      id="select"
      className={`group w-full ${props.wFit ? 'min-w-fit' : ''} ${
        props.wFull ? 'w-full' : ''
      }`}
    >
      <div
        id="category-select"
        className="relative w-full line-clamp-1 flex-nowrap text-ellipsis group/category-select cursor-pointer "
      >
        <label
          htmlFor="options-view-button"
          className="text-[0.75rem] tracking-wide [&:has(input[id='options-view-button']:checked)]:text-green-500 dark:group-[&:has(input[type='radio']:checked)]:text-white group-[&:has(input[type='radio']:checked)]:text-black"
        >
          {props.label}
        </label>
        <input
          type="checkbox"
          id="options-view-button"
          className="peer [all:unset] [position:absolute] [inset:0] [cursor:pointer] [z-index:3]"
        />

        <div
          id="select-button"
          className="group/select-button peer-focus/check:outline peer-focus/check:outline-blue-500 mt-2 flex p-2 items-center justify-between rounded-xl border-2 border-zinc-500"
        >
          <div
            id="selected-value"
            className="text-black line-clamp-1 dark:text-white group-[&:has(input:checked)]/category-select:text-blue-500 text-sm tracking-wide"
          >
            {props.emptyValue || 'Selecione uma opção'}
          </div>

          <div id="icons" className="group/icons text-[#AFABB6]">
            <span className="block group-[&:has(input:checked)]/category-select:hidden">
              <MdExpandMore />
            </span>
            <span className="hidden group-[&:has(input:checked)]/category-select:block">
              <MdExpandLess />
            </span>
          </div>
        </div>
      </div>

      <ul
        id="options"
        className="
          hidden
          border-2
          mt-2
          flex-col
          flex-1
          rounded-xl
          border-zinc-700
          bg-zinc-50
          dark:bg-zinc-900
          group-[&:has(input[type='checkbox']:checked)]:flex
        "
      >
        {props.children}
      </ul>
    </div>
  )
}
