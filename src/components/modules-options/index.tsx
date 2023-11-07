'use client'

import {
  MdConnectWithoutContact,
  MdSupportAgent,
  MdMapsUgc,
} from 'react-icons/md'

import { useAuthContext } from '@/utils/hooks'
import { Option } from '../option'

export function ModulesOptions() {
  const { user } = useAuthContext()

  return (
    <>
      {user?.modules.map((mdl, index) => (
        <Option
          key={index}
          label={mdl.title}
          value={`/${mdl.type}/${mdl.title}/dashboard`}
          icon={
            mdl.type === 'ci'
              ? MdConnectWithoutContact
              : mdl.type === 'ombudsman'
              ? MdSupportAgent
              : mdl.type === 'customer-service'
              ? MdMapsUgc
              : undefined
          }
        />
      ))}
    </>
  )
}
