'use client'
import { ModalProps } from '@/@types/modal'
import { useCallback, useEffect } from 'react'

export function Modal(props: ModalProps) {
  const escListener = useCallback(
    function (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        props.onClose?.()
      }
    },
    [props],
  )

  useEffect(() => {
    if (props.open) {
      window.addEventListener('keydown', escListener)
    }

    return function cleanListeners() {
      window.removeEventListener('keydown', escListener)
    }
  }, [escListener, props.open])

  return props.open ? (
    <div
      autoFocus
      id="modal-area"
      aria-hidden
      className="flex flex-1 justify-center items-center bg-black bg-opacity-70 inset-0 fixed left-0 top-0 z-50"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'modal-area') {
          props.onClose?.()
        }
      }}
    >
      {props.children}
    </div>
  ) : null
}
