import { env } from '../config/env'
import { HttpError } from './httpError'

export type QueryParams = Record<string, string | number | boolean | undefined | null>

interface RequestOptions {
  query?: QueryParams
  signal?: AbortSignal
}

const buildUrl = (path: string, query?: QueryParams): string => {
  const url = new URL(path, env.apiBaseUrl)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    }
  }
  return url.toString()
}

const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text()
  if (!text) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const getErrorMessage = (body: unknown, fallback: string): string => {
  if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
    return body.message
  }
  return fallback
}

export const httpClient = {
  async get<T>(path: string, { query, signal }: RequestOptions = {}): Promise<T> {
    const response = await fetch(buildUrl(path, query), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-api-key': env.apiKey,
      },
      signal,
    })

    const body = await parseBody(response)

    if (!response.ok) {
      throw new HttpError(response.status, getErrorMessage(body, response.statusText), body)
    }

    return body as T
  },
}
