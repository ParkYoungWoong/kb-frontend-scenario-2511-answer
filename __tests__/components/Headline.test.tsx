import { render, screen } from '@testing-library/react'
import Headline from '@/components/Headline'

// 폰트 모킹
jest.mock('@/styles/fonts', () => ({
  oswald: {
    className: 'oswald-font'
  }
}))

describe('<Headline>', () => {
  // 기본 렌더링 확인
  test('Headline 컴포넌트가 정상적으로 렌더링된다', () => {
    render(<Headline />)

    // section 요소 확인
    const section = screen.getByTestId('headline')
    expect(section).toBeInTheDocument()
  })

  test('메인 제목이 정상적으로 렌더링된다', () => {
    render(<Headline />)

    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()

    const headingText = mainHeading.textContent
    expect(headingText).toContain('OMDb API')
    expect(headingText).toContain('THE OPEN')
    expect(headingText).toContain('MOVIE DATABASE')
  })
})
