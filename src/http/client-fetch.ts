export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: object
  data?: TData | FormData
  responseType?:
    | 'arrayBuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
  signal?: AbortSignal
  headers?: HeadersInit
}

export type ResponseConfig<TData = unknown, TError = unknown> =
  | [TError | null]
  | [null, TData]

export const httpClientFetch = async <
  TData = unknown,
  TError = unknown,
  TVariable = unknown,
>(
  config: RequestConfig<TVariable>
): Promise<ResponseConfig<TData, TError>> => {
  const response = await fetch(`${config.baseURL}${config.url}`, {
    method: config.method?.toUpperCase(),
    body: config.data ? JSON.stringify(config.data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    signal: config.signal,
  })

  const data: TData = await response.json()

  if (!response.ok) {
    return [data as TError | null]
  }

  return [null, data]
}

export default httpClientFetch
