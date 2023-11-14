'use client'

import { DrawerContextData, DrawerOption } from '@/@types'
import { Drawer } from '@/components/drawer'
import { customerServiceOptions } from '@/utils/drawer-options'
import { ombudsmanOptions } from '@/utils/drawer-options/ombudsman'
import { useAuthContext, useModuleContext } from '@/utils/hooks'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

export const DrawerContext = createContext({} as DrawerContextData)

export function DrawerProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext()
  const moduleContext = useModuleContext()

  const [isOpen, setIsOpen] = useState(false)
  const [drawerOptions, setDrawerOptions] = useState<DrawerOption[]>([])

  const toggleDrawerOpen = useCallback(() => {
    setIsOpen((oldValue) => !oldValue)
  }, [])

  useEffect(() => {
    const drawer = document.getElementById('drawer-area')
    const navigator = document.getElementById('nav-area')
    if (isOpen && window.screen.width < 640) {
      if (drawer && navigator) {
        drawer.style.display = 'block'
        setTimeout(() => {
          drawer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
          navigator.style.left = '0px'
        }, 10)
      }
    } else if (window.screen.width < 640) {
      const drawer = document.getElementById('drawer-area')

      if (drawer && navigator) {
        navigator.style.left = '-100%'
        drawer.style.backgroundColor = 'rgba(0, 0, 0, 0.0)'
        setTimeout(() => {
          drawer.style.display = 'none'
        }, 100)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (moduleContext && moduleContext.type === 'customer-service') {
      setDrawerOptions(
        customerServiceOptions(moduleContext.profile, moduleContext.title),
      )
    } else if (moduleContext && moduleContext.type === 'ombudsman') {
      setDrawerOptions(
        ombudsmanOptions(moduleContext.profile, moduleContext.title),
      )
    }
  }, [moduleContext, moduleContext?.title, moduleContext?.type])

  useEffect(() => {
    window.addEventListener('click', function (e) {
      if ((e.target as HTMLElement).id === 'drawer-area') {
        setIsOpen(false)
      }
    })

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setIsOpen(true)
      }
    })
  }, [])

  return (
    <DrawerContext.Provider
      value={{ isOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions }}
    >
      <Drawer options={drawerOptions} user={user}>
        {children}
      </Drawer>
    </DrawerContext.Provider>
  )
}
