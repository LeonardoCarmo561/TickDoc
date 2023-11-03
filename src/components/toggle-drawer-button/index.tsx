'use client'
import { useDrawerContext } from '@/utils/hooks/use-drawer-context'
import { ButtonHTMLAttributes } from 'react'

type ToggleDrawerButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function ToggleDrawerButton(props: ToggleDrawerButtonProps) {
  const { toggleDrawerOpen } = useDrawerContext()

  return (
    <button
      {...props}
      onClick={(e) => {
        toggleDrawerOpen()
        props.onClick?.(e)
      }}
    />
  )
}
