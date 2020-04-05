import { useEffect, useState } from 'react'

export const useAwait = <T>(promise: Promise<T>) => {
  const [response, setResponse] = useState(null as T | null)
  const [error, setError] = useState(null)
  useEffect(() => {
    promise.then((response) => {
      console.log('Got response', response)
      setResponse(response)
    }, setError)
  }, [])
  return { response, error }
}
