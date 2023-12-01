export type ToastType = 'alert' | 'success' | 'error' | 'info'

export type ToastProps = {
  type: ToastType
  message: string
  id: number
}

export type ToastContextData = {
  callToast: (toastType: ToastType, message: string) => void
  removeToast: (id: number) => void
  toastsCount: number
}
