import { redirect } from 'next/navigation'
export default async function OmbudsmanSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  redirect(`/ouvidoria/${params.slug}/login`)
  // ...
}
