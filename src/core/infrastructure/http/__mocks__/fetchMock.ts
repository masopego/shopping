import { vi } from 'vitest';

interface FetchResponseMock {
  status?: number;
  statusText?: string;
  body?: string;
}

export const mockFetchResponse = ({ status = 200, statusText = 'OK', body = '' }: FetchResponseMock = {}) => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(body || null, { status, statusText }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

export const mockFetchJson = (data: unknown, init: Omit<FetchResponseMock, 'body'> = {}) =>
  mockFetchResponse({ ...init, body: JSON.stringify(data) });

export const getRequestedUrl = (fetchMock: ReturnType<typeof vi.fn>): URL => new URL(fetchMock.mock.calls[0][0]);

export const getRequestInit = (fetchMock: ReturnType<typeof vi.fn>): RequestInit => fetchMock.mock.calls[0][1];
