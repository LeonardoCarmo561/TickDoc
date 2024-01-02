import { InternalUsersTable } from '@/components/pages/ombudsman/internalusers'
import { Metadata } from 'next'

export function generateMetadata({
  params,
}: {
  params: { module_title: string }
}): Metadata {
  const moduleTitle = params.module_title

  return {
    title: `Usuários Internos de ${moduleTitle} · Ouvidoria · TickDoc`,
    description: `Usuários Internos do módulo de ouvidoria ${moduleTitle} para gestão de manifestações abertas digitalmente`,
  }
}

export default function InternalUsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main>
      <InternalUsersTable queryParams={searchParams} />
    </main>
  )
}
