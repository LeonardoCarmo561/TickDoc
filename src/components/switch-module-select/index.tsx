'use client'
import { Option } from '../option'
import { Select } from '../select'

export function SwitchModuleSelect() {
  return (
    <Select
      title="Alterar módulo"
      label="Selecione um módulo"
      onChange={(e) => console.log(e)}
    >
      <Option label="TickDoc" value="/customer-service/TickDoc/dashboard" />
      <Option label="Alguma coisa" value="/ombudsman/TickDoc/dashboard" />
    </Select>
  )
}
