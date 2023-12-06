'use client'
import { ToastAcceptTypes, ToastContextData, ToastType } from '@/@types'
import { Toast, ToastContainer } from '@/components'
import { ReactNode, createContext, useCallback, useState } from 'react'

export const ToastContext = createContext({} as ToastContextData)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const handleAddToast = useCallback(
    (type: ToastAcceptTypes, message: string) => {
      const newToast: ToastType = { id: Date.now.toString(), type, message }
      setToasts((oldValue) =>
        oldValue.length > 0 ? [...oldValue, newToast] : [newToast],
      )
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((oldValue) => oldValue.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast: handleAddToast }}>
      {children}
      {toasts.length > 0 && (
        <ToastContainer>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              type={toast.type}
              message={toast.message}
              onClick={() => removeToast(toast.id)}
            />
          ))}
        </ToastContainer>
      )}
    </ToastContext.Provider>
  )
}
