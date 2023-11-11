import { Option } from '@/components/option'
import { Select } from '@/components/select'
import { Metadata } from 'next'
import {
  MdConnectWithoutContact,
  MdMapsUgc,
  MdSupportAgent,
} from 'react-icons/md'

export function generateMetadata({
  params,
}: {
  params: { module_title: string }
}): Metadata {
  const moduleTitle = params.module_title

  return {
    title: `Dashboard de ${moduleTitle} - S.A.C | TickDoc`,
    description: `Dashboard do módulo de S.A.C ${moduleTitle} para gestão de protocolos abertos digitalmente`,
  }
}

export default function Dashboard() {
  return (
    <main>
      <div className="w-full max-w-xs">
        <Select label="Módulo" wFull>
          <Option
            label="TickDoc"
            value="/customer-service/TickDoc/dashboard"
            icon={<MdMapsUgc />}
          />
          <Option
            label="TickDoc"
            value="/ombudsman/TickDoc/dashboard"
            icon={<MdSupportAgent />}
          />
          <Option
            label="TickDoc"
            value="/ci/TickDoc/dashboard"
            icon={<MdConnectWithoutContact />}
          />
        </Select>
      </div>
    </main>
  )
}
