import { test, expect } from '@playwright/test'

test.describe('메인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/Search/)

    // Headline 컴포넌트 확인
    await expect(page.locator('h1')).toBeVisible()

    // 검색바 확인
    const searchInput = page.getByTestId('input-text')
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toHaveAttribute(
      'placeholder',
      'Search for a movie'
    )

    // 버튼들 확인
    await expect(page.getByTestId('button-reset')).toBeVisible()
    await expect(page.getByTestId('button-search')).toBeVisible()
  })

  test('검색 입력란에 텍스트를 입력할 수 있어야 함', async ({ page }) => {
    const searchInput = page.getByTestId('input-text')

    await searchInput.fill('Frozen')
    await expect(searchInput).toHaveValue('Frozen')
  })

  test('초기 상태에서 안내 메시지가 표시되어야 함', async ({ page }) => {
    // 초기 메시지 확인
    const message = page.locator('text=Search for the movie title!')
    await expect(message).toBeVisible()
  })
})
