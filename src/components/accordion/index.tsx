import { AccoridonProps } from '@/@types/accordion-props'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

export function Accordion(props: AccoridonProps) {
  return (
    <section className="border border-blue-500 flex flex-col w-full [&:not(:has(input:checked))]:overflow-hidden transition-height [&:not(:has(input:checked))]:h-14 bg-white dark:bg-zinc-700 shadow-lg p-2 rounded-xl">
      <div className="relative h-12 min-h-[3rem] flex w-full items-center justify-between rounded-t-xl overflow-hiddenx ">
        <input
          type="checkbox"
          className="[all:unset] [cursor:pointer] [position:absolute] [inset:0] peer focus:outline focus:outline-blue-500"
        />
        {props.title}
        <MdExpandMore className="peer-checked:hidden block h-6 w-6" />
        <MdExpandLess className="peer-checked:block hidden h-6 w-6" />
      </div>

      {props.children}
    </section>
  )
}
