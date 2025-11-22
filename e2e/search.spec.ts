import { test, expect } from '@playwright/test'

test.describe('영화 검색 기능', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('영화를 검색하면 결과가 표시되어야 함', async ({ page }) => {
    // 검색어 입력
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Frozen')

    // 검색 버튼 클릭
    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    // 영화 아이템이 표시되는지 확인 (API 응답 대기)
    const movieList = page.locator('ul.flex.flex-wrap')
    await expect(movieList).toBeVisible({ timeout: 15000 })
    
    // 영화 제목이 포함되어 있는지 확인
    await expect(movieList).toContainText(/Frozen/i, { timeout: 10000 })
  })

  test('검색 결과가 없을 때 적절한 메시지가 표시되어야 함', async ({
    page
  }) => {
    // 존재하지 않는 영화 제목으로 검색
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('asdfqwerzxcv12345nonexistentmovie')

    // 검색 버튼 클릭
    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    // API 응답 대기
    await page.waitForTimeout(2000)

    // "영화를 찾을 수 없습니다" 또는 유사한 메시지 확인
    // 실제 앱에서 표시되는 메시지를 확인해야 합니다
    const noResultsMessage = page.locator(
      'text=/찾을 수 없습니다|No movies found|Movie not found/i'
    )
    await expect(noResultsMessage).toBeVisible({ timeout: 10000 })
  })

  test('Reset 버튼을 클릭하면 검색 결과가 초기화되어야 함', async ({
    page
  }) => {
    // 먼저 검색 수행
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Frozen')

    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    // 영화 아이템이 있는지 확인
    const movieItems = page.locator('li a[href*="/movies/"]')
    await expect(movieItems.first()).toBeVisible({ timeout: 15000 })

    // Reset 버튼 클릭
    const resetButton = page.getByTestId('button-reset')
    await resetButton.click()

    // 입력란이 비워졌는지 확인
    await expect(searchInput).toHaveValue('')

    // 초기 메시지가 다시 나타나는지 확인
    const initialMessage = page.locator('text=Search for the movie title!')
    await expect(initialMessage).toBeVisible()
  })

  test('빈 문자열로 검색할 수 없어야 함', async ({ page }) => {
    const searchInput = page.getByTestId('input-text')
    const searchButton = page.getByTestId('button-search')

    // 빈 입력 상태에서 검색
    await searchButton.click()

    // 페이지가 변하지 않았는지 확인 (초기 메시지가 여전히 보임)
    const initialMessage = page.locator('text=Search for the movie title!')
    await expect(initialMessage).toBeVisible()

    // 영화 목록이 비어있는지 확인 (헤더 링크 제외)
    const movieList = page.locator('ul.flex.flex-wrap li')
    await expect(movieList).toHaveCount(0)
  })

  test('여러 번 연속으로 검색할 수 있어야 함', async ({ page }) => {
    const searchInput = page.getByTestId('input-text')
    const searchButton = page.getByTestId('button-search')

    // 첫 번째 검색
    await searchInput.fill('Frozen')
    await searchButton.click()
    
    // 첫 번째 검색 결과 확인
    const movieList = page.locator('ul.flex.flex-wrap')
    await expect(movieList).toBeVisible({ timeout: 15000 })
    await expect(movieList).toContainText(/Frozen/i)

    // 두 번째 검색
    await searchInput.fill('Avatar')
    await searchButton.click()
    
    // 두 번째 검색 결과 확인
    await expect(movieList).toBeVisible({ timeout: 15000 })
    await expect(movieList).toContainText(/Avatar/i)
  })
})
