export function FormatStatus({
  status,
  active = 'Ativo',
  inactive = 'Inativo',
}: {
  status: boolean
  active?: string
  inactive?: string
}) {
  return (
    <div
      className={`${
        !status ? 'bg-red-300' : 'bg-green-300'
      } text-xs font-semibold text-black w-full rounded-xl p-1 px-2 items-center justify-center`}
    >
      <span className="flex justify-center">{status ? active : inactive}</span>
    </div>
  )
}
