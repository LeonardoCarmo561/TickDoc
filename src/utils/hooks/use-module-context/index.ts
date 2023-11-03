import { ModuleContext } from '@/contexts/module-context'
import { useContext } from 'react'

export function useModuleContext() {
  return useContext(ModuleContext)
}
