import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  // e2e 테스트 제외 (Playwright 사용)
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/e2e/'],
  // 커버리지에서 제외할 경로
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/e2e/',
    '/coverage/',
    '/playwright-report/',
    '/test-results/'
  ]
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
