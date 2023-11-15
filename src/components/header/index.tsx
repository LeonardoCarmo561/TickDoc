import { ModuleLogo } from '..'
import { SwitchModule } from '../switch-module'

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
          <h1 className="text-2xl font-semibold">
            {moduleType} - {moduleTitle}
          </h1>
        </div>
        <div className="flex flex-1 sm:flex-[2] items-center justify-center">
          <ModuleLogo />
        </div>
        <div className="flex flex-1 box-border p-2 justify-end">
          <SwitchModule />
        </div>
      </div>
    </header>
  )
}
