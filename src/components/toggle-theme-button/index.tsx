'use client'
import { useThemeContext } from '@/utils/hooks/use-theme-context'
import { ButtonHTMLAttributes } from 'react'

type ToggleThemeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function ToggleThemeButton(props: ToggleThemeButtonProps) {
  const { toggleTheme } = useThemeContext()

  return (
    <button
      {...props}
      onClick={(e) => {
        toggleTheme()
        props.onClick?.(e)
      }}
    />
  )
}
