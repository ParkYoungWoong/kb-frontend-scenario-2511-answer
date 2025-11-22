import { test, expect } from '@playwright/test'

test.describe('접근성 및 반응형', () => {
  test('키보드로 검색 폼을 사용할 수 있어야 함', async ({ page }) => {
    await page.goto('/')

    // 검색 입력란에 직접 포커스
    const searchInput = page.getByTestId('input-text')
    await searchInput.click()

    // 검색어 입력
    await page.keyboard.type('Frozen')

    // Enter 키로 검색 실행
    await page.keyboard.press('Enter')

    // 검색이 실행되었는지 확인
    const movieItems = page.locator('li a[href*="/movies/"]')
    await expect(movieItems.first()).toBeVisible({ timeout: 15000 })
  })

  test('모바일 뷰포트에서 레이아웃이 적절히 조정되어야 함', async ({
    page
  }) => {
    // 모바일 뷰포트 설정
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // 주요 요소들이 여전히 보이고 사용 가능한지 확인
    await expect(page.getByTestId('input-text')).toBeVisible()
    await expect(page.getByTestId('button-search')).toBeVisible()
    await expect(page.getByTestId('button-reset')).toBeVisible()

    // 검색 수행
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Frozen')

    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    // 영화 카드가 표시되는지 확인 (영화 목록 ul)
    const movieList = page.locator('ul.flex.flex-wrap')
    await expect(movieList).toBeVisible({ timeout: 15000 })
    await expect(movieList).toContainText(/Frozen/i)
  })

  test('태블릿 뷰포트에서 정상 작동해야 함', async ({ page }) => {
    // 태블릿 뷰포트 설정
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    // 검색 기능 테스트
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Avatar')

    const searchButton = page.getByTestId('button-search')
    await searchButton.click()

    const movieItems = page.locator('li a[href*="/movies/"]')
    await expect(movieItems.first()).toBeVisible({ timeout: 15000 })
  })

  test('이미지가 로드 실패해도 alt 텍스트가 표시되어야 함', async ({
    page
  }) => {
    await page.goto('/')

    // 검색 수행
    const searchInput = page.getByTestId('input-text')
    await searchInput.fill('Frozen')

    const searchButton = page.getByTestId('button-search')
    await searchButton.click()
    await page.waitForTimeout(2000)

    // 영화 아이템 찾기
    const firstMovie = page
      .locator('li')
      .filter({ hasText: /Frozen/ })
      .first()
    await expect(firstMovie).toBeVisible({ timeout: 10000 })

    // 이미지에 alt 속성이 있는지 확인
    const image = firstMovie.locator('img')
    const altText = await image.getAttribute('alt')
    expect(altText).toBeTruthy()
    expect(altText?.length).toBeGreaterThan(0)
  })

  test('링크가 적절한 텍스트를 가지고 있어야 함', async ({ page }) => {
    await page.goto('/')

    // Header 링크 확인
    const headerLinks = page.locator('header a')
    const count = await headerLinks.count()
    expect(count).toBeGreaterThan(0)

    // 각 링크가 텍스트나 접근 가능한 이름을 가지고 있는지 확인
    for (let i = 0; i < count; i++) {
      const link = headerLinks.nth(i)
      const accessibleName = await link.textContent()
      // 링크가 비어있지 않거나 이미지/아이콘을 포함하는지 확인
      const hasContent =
        accessibleName?.trim() || (await link.locator('img, svg').count()) > 0
      expect(hasContent).toBeTruthy()
    }
  })
})
