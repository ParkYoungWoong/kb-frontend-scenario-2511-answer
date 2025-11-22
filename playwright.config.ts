import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E 테스트 설정
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* 병렬 테스트 실행 */
  fullyParallel: true,
  /* CI 환경에서는 재시도를 활성화 */
  retries: process.env.CI ? 2 : 0,
  /* CI 환경에서는 병렬 처리 없이 실행 */
  workers: process.env.CI ? 1 : undefined,
  /* 테스트 레포터 설정 */
  reporter: 'html',
  /* 모든 테스트의 공통 설정 */
  use: {
    /* 액션 실패 시 재시도하기 전 대기 시간 */
    actionTimeout: 10000,
    /* 베이스 URL 설정 */
    baseURL: 'http://localhost:3000',
    /* 실패 시 스크린샷 수집 */
    screenshot: 'only-on-failure',
    /* 실패 시 비디오 수집 */
    video: 'retain-on-failure',
    /* 트레이스 수집 (디버깅용) */
    trace: 'on-first-retry'
  },

  /* 여러 브라우저에서 테스트 실행 설정 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  /* 테스트 실행 전 개발 서버 시작 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
})
