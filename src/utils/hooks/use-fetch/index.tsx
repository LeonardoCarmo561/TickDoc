/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '..'

export function useFetch<T = unknown>(
  serviceFuncion: Promise<T | Error>,
  onRevalidate?: () => void,
) {
  const { debounce } = useDebounce(100)
  const [update, setUpdate] = useState(true)
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const revalidate = useCallback(() => {
    setUpdate(true)
    onRevalidate?.()
  }, [])

  useEffect(() => {
    debounce(() => {
      if (update) {
        setIsLoading(true)
        serviceFuncion
          .then((res) => {
            if (res instanceof Error) {
              setError(res)
            } else {
              setData(res)
            }
          })
          .catch((err) => {
            setError(new Error(err))
          })
          .finally(() => {
            setUpdate(() => false)
            setIsLoading(false)
          })
      }
    })
  }, [update])

  return { data, isLoading, error, revalidate }
}
