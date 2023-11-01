import { Metadata } from 'next'

export function generateMetadata({
  params,
}: {
  params: { module_title: string }
}): Metadata {
  const moduleTitle = params.module_title

  return {
    title: `Dashboard de ${moduleTitle} | Ouvidoria | TickDoc`,
    description: `Dashboard do módulo de ouvidoria ${moduleTitle} para gestão de manifestações abertas digitalmente`,
  }
}

export default function Dashboard() {
  return (
    <main>
      <span>S.A.C Dashboard</span>
    </main>
  )
}
