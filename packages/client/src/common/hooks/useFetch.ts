import { useAwait } from './useAwait'

export const useFetch = (url: string, options?: RequestInit) =>
  useAwait(fetch(url, options).then((_) => _.json()))
