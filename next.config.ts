import type { NextConfig } from 'next';

const securityHeaders = [
  // Evita que el sitio sea embebido en iframes de otros sitios (clickjacking)
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Bloquea ataques XSS en navegadores viejos
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Evita que el navegador adivine el tipo de archivo (MIME sniffing)
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Controla qué información se envía al hacer clic en links externos
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Fuerza HTTPS por 2 años — nunca permite HTTP
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Controla qué APIs del navegador puede usar el sitio
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Content Security Policy — bloquea scripts y recursos no autorizados
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Scripts: solo del mismo sitio + Google Fonts + Vercel analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://va.vercel-scripts.com",
      // Estilos: mismo sitio + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fuentes: Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Imágenes: mismo sitio + data URIs (para fotos del admin)
      "img-src 'self' data: blob: https:",
      // Conexiones: mismo sitio + PayPal + Vercel analytics
      "connect-src 'self' https://www.paypal.com https://vitals.vercel-insights.com",
      // Formularios: solo pueden enviar a PayPal y al mismo sitio
      "form-action 'self' https://www.paypal.com",
      // Frames: solo PayPal (para el widget de donación)
      "frame-src https://www.paypal.com",
      // No permite ser embebido en iframes de otros sitios
      "frame-ancestors 'self'",
      // Bloquea objetos Flash y similares
      "object-src 'none'",
      // Base URL solo del mismo sitio
      "base-uri 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Headers de seguridad aplicados a todas las páginas
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Optimizaciones de rendimiento
  poweredByHeader: false, // Oculta que usas Next.js (menos info para atacantes)
  compress: true,

  // Configuración de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
};

export default nextConfig;
