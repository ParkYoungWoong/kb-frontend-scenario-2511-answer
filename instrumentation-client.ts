import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://8457410fb10ab00ab7f6c777f748915b@o4510287812755456.ingest.us.sentry.io/4510288759226368',
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
