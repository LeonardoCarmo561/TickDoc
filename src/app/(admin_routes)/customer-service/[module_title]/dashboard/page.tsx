import { ToggleDrawerButton } from '@/components'
import { Metadata } from 'next'

export function generateMetadata({
  params,
}: {
  params: { module_title: string }
}): Metadata {
  const moduleTitle = params.module_title

  return {
    title: `Dashboard de ${moduleTitle} | S.A.C | TickDoc`,
    description: `Dashboard do módulo de S.A.C ${moduleTitle} para gestão de protocolos abertos digitalmente`,
  }
}

export default function Dashboard() {
  return (
    <main>
      <span>S.A.C Dashboard</span>
      <ToggleDrawerButton>Clica aqui pra trocar</ToggleDrawerButton>
    </main>
  )
}
