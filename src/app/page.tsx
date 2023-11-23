import { redirect } from 'next/navigation'

export default function Home() {
  return process.env.NODE_ENV === 'production' ? (
    redirect('/admin')
  ) : (
    <main>
      <h1>Página de vendas do TickDoc</h1>
    </main>
  )
}
