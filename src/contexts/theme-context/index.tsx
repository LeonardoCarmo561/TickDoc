'use client'
import { ThemeContextData } from '@/@types'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('')

  const themeName = useMemo(() => {
    return theme
  }, [theme])

  function toggleTheme() {
    if (theme === 'dark') {
      localStorage.theme = 'light'
      setTheme('light')
    } else {
      localStorage.theme = 'dark'
      setTheme('dark')
    }
  }

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else if (localStorage.theme === 'light') {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
