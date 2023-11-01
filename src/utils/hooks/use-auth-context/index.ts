'use client'

import { AuthContext } from '@/contexts/auth-context'
import { useContext } from 'react'

export function useAuthContext() {
  return useContext(AuthContext)
}
