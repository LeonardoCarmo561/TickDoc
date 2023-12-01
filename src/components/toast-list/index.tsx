import { ReactNode } from 'react'

export function ToastList({ children }: { children: ReactNode }) {
  return (
    <div className="fixed flex flex-col gap-2 right-2 top-2 h-fit max-w-xs w-full z-[10000]">
      {children}
    </div>
  )
}
