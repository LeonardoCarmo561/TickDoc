import { ModuleLogo } from '..'
import { Option } from '../option'
import { Select } from '../select'

export function Header({
  moduleTitle,
  moduleType,
}: {
  moduleTitle: string
  moduleType: string
}) {
  return (
    <header>
      <div className="flex flex-1 h-24 items-center border-b-[1px] text-black dark:text-white">
        <div className="hidden sm:flex sm:flex-1">
          <span className="text-lg font-semibold">
            {moduleType} - {moduleTitle}
          </span>
        </div>
        <div className="flex flex-1 sm:flex-[2] items-center justify-center">
          <ModuleLogo />
        </div>
        <div className="flex flex-1 box-border p-2">
          <Select title="Alterar módulo" label="Selecione um módulo">
            <Option
              label="TickDoc"
              value="/customer-service/TickDoc/dashboard"
            />
            <Option label="Alguma coisa" value="/ombudsman/TickDoc/dashboard" />
          </Select>
        </div>
      </div>
    </header>
  )
}
