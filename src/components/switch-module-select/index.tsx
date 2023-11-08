'use client'
import { useAuthContext } from '@/utils/hooks'
import { Option } from '../option'
import { Select } from '../select'
import { useEffect, useState } from 'react'
import {
  MdConnectWithoutContact,
  MdMapsUgc,
  MdSupportAgent,
} from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation'

type OptionType = {
  title?: string
  icon?: () => JSX.Element
  label: string
  value: string
}

export function SwitchModuleSelect() {
  const { user } = useAuthContext()
  const { push } = useRouter()
  const path = usePathname()

  const [options, setOptions] = useState<OptionType[]>([])

  useEffect(() => {
    setOptions(
      user?.modules.map((mdl) => ({
        label: mdl.title,
        icon:
          mdl.type === 'ci'
            ? MdConnectWithoutContact
            : mdl.type === 'customer-service'
            ? MdMapsUgc
            : mdl.type === 'ombudsman'
            ? MdSupportAgent
            : undefined,
        value: `/${mdl.type}/${mdl.title}/dashboard`,
        title:
          mdl.type === 'customer-service'
            ? 'S.A.C'
            : mdl.type === 'ci'
            ? 'Com. Interna'
            : mdl.type === 'ombudsman'
            ? 'Ouvidoria'
            : undefined,
      })) || [],
    )
  }, [user])

  return (
    <Select
      title="Alterar módulo"
      label="Selecione um módulo"
      onChange={(e) => push(String(e))}
      value={path}
    >
      {options.map((opt, index) => (
        <Option
          key={index}
          icon={opt.icon ? <opt.icon /> : undefined}
          label={opt.label}
          title={opt.title}
          value={opt.value}
        />
      ))}
    </Select>
  )
}
