import { render, screen } from '@testing-library/react'
import Loader from '@/components/Loader'

describe('<Loader>', () => {
  // 기본 로더 렌더링 확인
  test('기본 컴포넌트가 정상적으로 렌더링된다', () => {
    render(<Loader />)

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  // size prop에 따른 크기 설정 확인
  test('size props를 사용하지 않으면 기본 크기가 적용된다', () => {
    const size = 20
    render(<Loader />)

    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle({
      width: `${size}px`,
      height: `${size}px`
    })
  })

  test('size props를 사용하면 해당 크기가 적용된다', () => {
    const size = 41
    render(<Loader size={size} />)

    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle({
      width: `${size}px`,
      height: `${size}px`
    })
  })

  test('color props를 사용하지 않으면 기본 색상이 적용된다', () => {
    render(<Loader />)

    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle({
      borderColor: '#FDC000'
    })
  })

  test('color props를 사용하면 해당 색상이 적용된다', () => {
    render(<Loader color="#FF5733" />)

    const loader = screen.getByTestId('loader')
    expect(loader).toHaveStyle({
      borderColor: '#FF5733'
    })
  })

  test('loading props가 false일 때 렌더링되지 않는다', () => {
    render(<Loader loading={false} />)

    const loader = screen.queryByTestId('loader') // 요소가 없으면 null 반환
    expect(loader).not.toBeInTheDocument()
  })

  test('loading props가 true일 때 렌더링된다', () => {
    render(<Loader loading={true} />)

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })
})
