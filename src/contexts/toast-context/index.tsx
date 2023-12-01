'use client'
import { ToastContextData, ToastProps, ToastType } from '@/@types'
import { Toast, ToastList } from '@/components'
import { ReactNode, createContext, useCallback, useState } from 'react'

export const ToastContext = createContext({} as ToastContextData)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const callToast = useCallback((type: ToastType, message: string) => {
    const id = Math.floor(Math.random() * 1000 + 1)
    setToasts((oldValue) =>
      oldValue ? [...oldValue, { message, type, id }] : [{ message, type, id }],
    )
  }, [])
  const removeToast = useCallback((id: number) => {
    setToasts((oldValue) => oldValue.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider
      value={{ callToast, removeToast, toastsCount: toasts.length }}
    >
      {children}
      {toasts.length > 0 && (
        <ToastList>
          {toasts.map((toast, index) => (
            <Toast
              id={toast.id}
              key={index}
              message={toast.message}
              type={toast.type}
            />
          ))}
        </ToastList>
      )}
    </ToastContext.Provider>
  )
}
