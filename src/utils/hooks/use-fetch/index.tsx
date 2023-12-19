/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '..'
import { api } from '@/services'

export function useFetch<T = unknown>(
  url: string,
  params?: { [key: string]: string },
  onRevalidate?: () => void,
) {
  const { debounce } = useDebounce(100)
  const [update, setUpdate] = useState(true)
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const revalidate = useCallback(() => {
    console.log('Executando')
    setUpdate(true)
    onRevalidate?.()
  }, [])

  useEffect(() => {
    debounce(() => {
      if (update) {
        setIsLoading(true)
        api
          .get(url, { params })
          .then((res) => setData(res.data))
          .catch((error) =>
            setError(new Error((error as { message: string }).message)),
          )
          .finally(() => {
            setUpdate(false)
            setIsLoading(false)
          })
      }
    })
  }, [update])

  return { data, setData, isLoading, error, revalidate }
}
