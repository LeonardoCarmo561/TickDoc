export type ToastAcceptTypes = 'success' | 'alert' | 'error' | 'info'

export type ToastContextData = {
  addToast: (type: ToastAcceptTypes, message: string) => void
}

export type ToastType = {
  id: string
  message: string
  type: ToastAcceptTypes
}
