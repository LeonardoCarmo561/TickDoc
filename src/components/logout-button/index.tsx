'use client'
import { useAuthContext } from '@/utils/hooks'
import { ButtonHTMLAttributes } from 'react'

type LogoutButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function LogoutButton(props: LogoutButtonProps) {
  const { logout } = useAuthContext()

  return (
    <button
      {...props}
      onClick={(e) => {
        logout()
        props.onClick?.(e)
      }}
    />
  )
}
