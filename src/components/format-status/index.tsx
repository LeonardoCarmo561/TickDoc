export function FormatStatus({ status }: { status: boolean }) {
  return (
    <div
      className={`${
        !status ? 'bg-red-300' : 'bg-green-300'
      } text-xs font-semibold text-black w-full rounded-xl p-1 px-2`}
    >
      <span>{status ? 'Ativo' : 'Inativo'}</span>
    </div>
  )
}
