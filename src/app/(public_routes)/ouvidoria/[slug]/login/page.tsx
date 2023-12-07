import { ClientData } from '@/@types'
import { Environment } from '@/utils'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const ombudsmanSlug = params.slug
  const institution: ClientData = await fetch(
    `${
      Environment.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8000'
        : Environment.URL_BASE
    }/V1/institution/${ombudsmanSlug}/`,
  ).then((res) => res.json())

  return {
    title: `${institution.slug} · ${institution.ombudsman_title} · Ouvidoria · TickDoc`,
    description: `${institution.slug} · ${institution.ombudsman_title} · Ouvidoria Eletrônica. Acesse e abra sua manifestação de maneira rápida e fácil · TickDoc`,
  }
}

export default function OmbudsmanLoginPage() {
  return (
    <main>
      <span>opa</span>
    </main>
  )
}
