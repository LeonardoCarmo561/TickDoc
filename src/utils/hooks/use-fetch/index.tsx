'use client'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '..'

export function useFetch<T = unknown>(serviceFuncion: Promise<T | Error>) {
  const { debounce } = useDebounce(100)
  const [update, setUpdate] = useState(true)
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const revalidate = useCallback(() => {
    setUpdate(true)
  }, [])

  useEffect(() => {
    debounce(() => {
      if (update) {
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
            setUpdate(false)
            setIsLoading(false)
          })
      }
    })
  }, [debounce, serviceFuncion, update])

  return { data, isLoading, error, revalidate }
}
