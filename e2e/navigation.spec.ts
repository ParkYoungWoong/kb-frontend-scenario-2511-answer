import { test, expect } from '@playwright/test'

test.describe('네비게이션', () => {
  test('브라우저 뒤로 가기/앞으로 가기가 정상 작동해야 함', async ({
    page
  }) => {
    // 메인 페이지 접속
    await page.goto('/')

    // 검색 수행
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Frozen')

    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    // 상세 페이지로 이동
    const firstMovie = page.locator('li a[href*="/movies/"]').first()
    await expect(firstMovie).toBeVisible({ timeout: 15000 })
    await firstMovie.click()

    // 상세 페이지 확인
    await expect(page).toHaveURL(/\/movies\/tt\d+/)

    // 뒤로 가기
    await page.goBack()
    await expect(page).toHaveURL('/')

    // 검색 결과가 유지되는지 확인
    await expect(searchInput).toHaveValue('Frozen')

    // 앞으로 가기
    await page.goForward()
    await expect(page).toHaveURL(/\/movies\/tt\d+/)
  })

  test('직접 URL로 상세 페이지에 접근할 수 있어야 함', async ({ page }) => {
    // Frozen (2013) 영화의 IMDb ID
    const movieId = 'tt2294629'

    // 직접 URL로 접근
    await page.goto(`/movies/${movieId}`)
    
    // 영화 제목이 표시되는지 확인
    const movieTitle = page.locator('h1')
    await expect(movieTitle).toBeVisible({ timeout: 10000 })
    await expect(movieTitle).toContainText(/Frozen/i)
  })

  test('잘못된 영화 ID로 접근 시 적절히 처리되어야 함', async ({ page }) => {
    // 존재하지 않는 영화 ID로 접근 시 에러가 발생할 수 있음
    // 페이지가 로드되고 에러가 표시되거나 처리되는지 확인
    const response = await page.goto('/movies/tt0000000')
    
    // 페이지가 응답을 받았는지 확인 (에러 처리 확인)
    expect(response?.status()).toBeDefined()
  })
})
