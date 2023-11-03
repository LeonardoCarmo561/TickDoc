'use client'
import { DrawerContext } from '@/contexts/drawer-context'
import { useContext } from 'react'

export function useDrawerContext() {
  return useContext(DrawerContext)
}
