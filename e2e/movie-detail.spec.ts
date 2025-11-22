import { test, expect } from '@playwright/test'

test.describe('영화 상세 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('영화 아이템을 클릭하면 상세 페이지로 이동해야 함', async ({ page }) => {
    // 검색 수행
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Frozen')

    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    // 첫 번째 영화 아이템이 나타날 때까지 대기
    const firstMovie = page.locator('li a[href*="/movies/"]').first()
    await expect(firstMovie).toBeVisible({ timeout: 15000 })

    // 링크 클릭
    await firstMovie.click()

    // URL이 /movies/[id] 형식으로 변경되었는지 확인
    await expect(page).toHaveURL(/\/movies\/tt\d+/)

    // 영화 제목이 표시되는지 확인
    const movieTitle = page.locator('h1')
    await expect(movieTitle).toBeVisible({ timeout: 10000 })

    // 영화 포스터 이미지가 있는지 확인
    const poster = page.locator('img[alt]')
    await expect(poster.first()).toBeVisible()
  })

  test('상세 페이지에 필요한 정보가 모두 표시되어야 함', async ({ page }) => {
    // 검색 수행
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Avatar')
    
    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    // 첫 번째 영화 아이템이 나타날 때까지 대기
    const firstMovie = page.locator('li a[href*="/movies/"]').first()
    await expect(firstMovie).toBeVisible({ timeout: 15000 })
    
    // 링크 클릭
    await firstMovie.click()

    // 주요 정보 확인
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
    
    // 평점 정보 확인
    const ratingsHeading = page.locator('h3').filter({ hasText: /Ratings/ })
    await expect(ratingsHeading).toBeVisible()

    // 배우 정보 확인
    const actorsHeading = page.locator('h3').filter({ hasText: /Actors/ })
    await expect(actorsHeading).toBeVisible()

    // 감독 정보 확인
    const directorHeading = page.locator('h3').filter({ hasText: /Director/ })
    await expect(directorHeading).toBeVisible()

    // 장르 정보 확인
    const genreHeading = page.locator('h3').filter({ hasText: /Genre/ })
    await expect(genreHeading).toBeVisible()
  })

  test('Header의 로고를 클릭하면 메인 페이지로 돌아가야 함', async ({
    page
  }) => {
    // 검색 수행 및 상세 페이지로 이동
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Frozen')

    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    const firstMovie = page.locator('li a[href*="/movies/"]').first()
    await expect(firstMovie).toBeVisible({ timeout: 15000 })

    await firstMovie.click()

    // 상세 페이지 확인
    await expect(page).toHaveURL(/\/movies\/tt\d+/)

    // Header의 로고나 홈 링크 클릭
    const headerLink = page.locator('header a').first()
    await headerLink.click()

    // 메인 페이지로 돌아왔는지 확인
    await expect(page).toHaveURL('/')

    // 검색바가 다시 보이는지 확인
    await expect(page.getByTestId('input-text')).toBeVisible()
  })
})
