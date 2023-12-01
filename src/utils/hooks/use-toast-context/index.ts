'use client'
import { ToastContext } from '@/contexts'
import { useContext } from 'react'

export function useToastContext() {
  return useContext(ToastContext)
}
