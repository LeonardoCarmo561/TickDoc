import { DrawerOption } from '@/@types'
import { adminOptions } from './admin'

export function ombudsmanOptions(
  profile: number,
  moduleTitle: string,
): DrawerOption[] {
  if (profile === 0) return adminOptions(moduleTitle)

  return []
}
