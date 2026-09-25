import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com', pathname: '/images/**' },
      { protocol: 'https', hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com', pathname: '/images/**' },
    ],
  },
};

export default nextConfig;
