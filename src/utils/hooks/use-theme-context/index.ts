import { ThemeContext } from '@/contexts/theme-context'
import { useContext } from 'react'

export function useThemeContext() {
  return useContext(ThemeContext)
}
