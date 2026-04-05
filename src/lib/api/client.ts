import { useAuthStore } from '@/stores/authStore'

const base = import.meta.env.VITE_API_BASE ?? '/api'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const headers = new Headers(init.headers)
  if (init.json !== undefined) {
    headers.set('Content-Type', 'application/json')
  }
  const token = useAuthStore.getState().accessToken
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers,
    body: init.json !== undefined ? JSON.stringify(init.json) : init.body,
  })

  if (!res.ok) {
    const text = await res.text()
    try {
      const j = JSON.parse(text) as { code?: string; message?: string }
      throw new ApiError(j.message ?? res.statusText, res.status, j.code)
    } catch (e) {
      if (e instanceof ApiError) throw e
      throw new ApiError(text || res.statusText, res.status)
    }
  }

  if (res.status === 204) return undefined as T
  const ct = res.headers.get('content-type')
  if (ct?.includes('application/json')) {
    return (await res.json()) as T
  }
  return undefined as T
}
