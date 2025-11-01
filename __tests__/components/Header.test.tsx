import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

// Next.js 훅 모킹
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

// 폰트 모킹
jest.mock('@/styles/fonts', () => ({
  oswald: {
    className: 'oswald-font'
  }
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>
const menuActiveClass = 'text-[var(--color-primary)]'
const getSearchMenu = () => screen.getByRole('link', { name: '🔍 Search' })
const getSampleMovieMenu = () =>
  screen.getByRole('link', { name: '📽️ Sample Movie' })

describe('<Header>', () => {
  beforeEach(() => {
    // 기본값으로 홈 경로 설정
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // 헤더 기본 렌더링 확인
  test('헤더가 정상적으로 렌더링된다', () => {
    render(<Header />)

    const logoLink = screen.getByRole('link', { name: 'OMDbAPI .COM' })
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  // 메뉴 항목들 올바른 렌더링 확인
  test('메뉴 항목들이 정상적으로 렌더링된다', () => {
    render(<Header />)

    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()
    // Search 메뉴 확인
    expect(searchMenu).toBeInTheDocument()
    expect(searchMenu).toHaveAttribute('href', '/')
    // Sample Movie 메뉴 확인
    expect(sampleMovieMenu).toBeInTheDocument()
    expect(sampleMovieMenu).toHaveAttribute('href', '/movies/tt4520988')
  })

  // 현재 경로에 따른 활성 메뉴 스타일 적용 확인
  test('현재 경로가 "/"일 때 Search 메뉴가 활성화된다', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Header />)

    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()
    // 해당 Search 메뉴는 활성화 스타일 (text-inherit)
    expect(searchMenu.parentElement).toHaveClass(menuActiveClass)
    // 다른 Sample Movie 메뉴는 비활성화 스타일
    expect(sampleMovieMenu.parentElement).not.toHaveClass(menuActiveClass)
  })

  test('현재 경로가 "/movies/tt4520988"일 때 Sample Movie 메뉴가 활성화된다', () => {
    mockUsePathname.mockReturnValue('/movies/tt4520988')
    render(<Header />)

    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()
    // Sample Movie 메뉴는 활성화 스타일
    expect(sampleMovieMenu.parentElement).toHaveClass(menuActiveClass)
    // Search 메뉴는 비활성화 스타일
    expect(searchMenu.parentElement).not.toHaveClass(menuActiveClass)
  })

  test('알 수 없는 경로일 때 모든 메뉴가 비활성화된다', () => {
    mockUsePathname.mockReturnValue('/this-is-unknown-path')
    render(<Header />)
    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()
    const colorClass = 'text-[var(--color-white-50)]'

    // 모든 메뉴가 비활성화 스타일
    expect(searchMenu).toHaveClass(colorClass)
    expect(sampleMovieMenu).toHaveClass(colorClass)

    expect(searchMenu.parentElement).not.toHaveClass(menuActiveClass)
    expect(sampleMovieMenu.parentElement).not.toHaveClass(menuActiveClass)
  })
})
