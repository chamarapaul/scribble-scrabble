import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Make package.json version available as an environment variable during build
  env: {
    NEXT_PUBLIC_APP_VERSION: require('./package.json').version,
  },
  
  // Existing security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Allow scripts from our domain, inline scripts, and CDN
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com",
              // Allow styles from our domain, inline styles, and Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com data:",
              // Allow fonts from our domain and Google Fonts
              "font-src 'self' data: https://fonts.gstatic.com",
              // Allow images from our domain, data URIs (for canvas), and blobs
              "img-src 'self' data: blob:",
              // Allow API requests to our domain
              "connect-src 'self'",
              // Allow web workers from our domain
              "worker-src 'self' blob:",
              // Allow manifests for PWA
              "manifest-src 'self'"
            ].join('; ')
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ]
  }
}

export default nextConfig