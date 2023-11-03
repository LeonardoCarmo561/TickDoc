import { DrawerOption } from '@/@types'
import { adminOptions } from './admin'

export function customerServiceOptions(
  profile: number,
  moduleTitle: string,
): DrawerOption[] {
  if (profile === 0) return adminOptions(moduleTitle)

  return []
}
