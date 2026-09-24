import 'server-only'

const DEFAULT_API_BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'

export const env = {
  apiBaseUrl: process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL,
  apiKey: process.env.API_KEY ?? '',
}
