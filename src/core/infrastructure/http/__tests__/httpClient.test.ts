import { envMock } from '../../config/__mocks__/envMock';
import { httpClient } from '../httpClient';
import { HttpError } from '../httpError';
import { getRequestInit, getRequestedUrl, mockFetchJson, mockFetchResponse } from '../__mocks__/fetchMock';

vi.mock('../../config/env', async () => {
  const { envMock } = await import('../../config/__mocks__/envMock');
  return { env: envMock };
});

describe('httpClient.get', () => {
  it('requests the path relative to the API base URL', async () => {
    const fetchMock = mockFetchJson([]);
    await httpClient.get('/products');

    expect(getRequestedUrl(fetchMock).href).toBe(`${envMock.apiBaseUrl}/products`);
  });

  it('uses the GET method', async () => {
    const fetchMock = mockFetchJson([]);
    await httpClient.get('/products');

    expect(getRequestInit(fetchMock).method).toBe('GET');
  });

  it('sends the JSON Accept header', async () => {
    const fetchMock = mockFetchJson([]);
    await httpClient.get('/products');

    expect(getRequestInit(fetchMock).headers).toMatchObject({ Accept: 'application/json' });
  });

  it('sends the API key in the x-api-key header', async () => {
    const fetchMock = mockFetchJson([]);
    await httpClient.get('/products');

    expect(getRequestInit(fetchMock).headers).toMatchObject({ 'x-api-key': envMock.apiKey });
  });

  it('forwards the abort signal to fetch', async () => {
    const fetchMock = mockFetchJson([]);
    const controller = new AbortController();
    await httpClient.get('/products', { signal: controller.signal });

    expect(getRequestInit(fetchMock).signal).toBe(controller.signal);
  });

  it('appends the query params to the URL', async () => {
    const fetchMock = mockFetchJson([]);
    await httpClient.get('/products', { query: { search: 'galaxy', limit: 10, inStock: true } });

    expect(getRequestedUrl(fetchMock).search).toBe('?search=galaxy&limit=10&inStock=true');
  });

  it('skips undefined, null and empty query params', async () => {
    const fetchMock = mockFetchJson([]);
    await httpClient.get('/products', { query: { search: '', limit: undefined, offset: null } });

    expect(getRequestedUrl(fetchMock).search).toBe('');
  });

  it('keeps query params whose value is 0', async () => {
    const fetchMock = mockFetchJson([]);
    await httpClient.get('/products', { query: { offset: 0 } });

    expect(getRequestedUrl(fetchMock).searchParams.get('offset')).toBe('0');
  });

  it('returns the JSON response body', async () => {
    const data = [{ id: '1' }];
    mockFetchJson(data);
    const result = await httpClient.get('/products');

    expect(result).toEqual(data);
  });

  it('returns undefined when the response has no body', async () => {
    mockFetchResponse({ status: 204, statusText: 'No Content' });
    const result = await httpClient.get('/products');

    expect(result).toBeUndefined();
  });

  it('returns the raw text when the body is not JSON', async () => {
    mockFetchResponse({ body: 'plain text' });
    const result = await httpClient.get('/products');

    expect(result).toBe('plain text');
  });

  it('throws an HttpError when the response is not ok', async () => {
    mockFetchResponse({ status: 500, statusText: 'Internal Server Error' });
    const request = httpClient.get('/products');

    await expect(request).rejects.toBeInstanceOf(HttpError);
  });

  it('includes the status code in the error', async () => {
    mockFetchResponse({ status: 404, statusText: 'Not Found' });
    const request = httpClient.get('/products/unknown');

    await expect(request).rejects.toMatchObject({ status: 404 });
  });

  it('uses the error body message when present', async () => {
    mockFetchJson({ error: 'Not Found', message: 'Product not found' }, { status: 404, statusText: 'Not Found' });
    const request = httpClient.get('/products/unknown');

    await expect(request).rejects.toThrow('Product not found');
  });

  it('falls back to the statusText when the body has no message', async () => {
    mockFetchJson({ error: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
    const request = httpClient.get('/products');

    await expect(request).rejects.toThrow('Unauthorized');
  });

  it('includes the response body in the error', async () => {
    const body = { error: 'Not Found', message: 'Product not found' };
    mockFetchJson(body, { status: 404, statusText: 'Not Found' });
    const request = httpClient.get('/products/unknown');

    await expect(request).rejects.toMatchObject({ body });
  });
});
