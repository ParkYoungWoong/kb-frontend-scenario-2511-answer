import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://8457410fb10ab00ab7f6c777f748915b@o4510287812755456.ingest.us.sentry.io/4510288759226368',
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true
})
