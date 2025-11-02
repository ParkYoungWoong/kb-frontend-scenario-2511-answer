import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'heropy.dev' },
      { protocol: 'https', hostname: 'm.media-amazon.com' }
    ]
  }
}

export default withSentryConfig(nextConfig, {
  org: 'heropy',
  project: 'parkyoungwoong-movie-app',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true
})
