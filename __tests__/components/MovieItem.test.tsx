import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MovieItem from '@/components/MovieItem'
import mockMovie from '@/__mocks__/movie.json'

// Next.js 모듈 모킹
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href
  }: {
    children: React.ReactNode
    href: string
  }) {
    return <a href={href}>{children}</a>
  }
})

/* eslint-disable @next/next/no-img-element */
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return (
      <img
        src={src}
        alt={alt}
      />
    )
  }
})

describe('<MovieItem>', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  test('영화 아이템이 정상적으로 렌더링된다', () => {
    render(<MovieItem movie={mockMovie} />)

    expect(screen.getByText(mockMovie.Title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.Year)).toBeInTheDocument()
  })

  test('영화 제목과 연도가 올바르게 표시된다', () => {
    render(<MovieItem movie={mockMovie} />)

    const title = screen.getByText(mockMovie.Title)
    const year = screen.getByText(mockMovie.Year)

    expect(title).toBeInTheDocument()
    expect(year).toBeInTheDocument()
  })

  test('영화 포스터 이미지가 올바른 속성으로 렌더링된다', () => {
    render(<MovieItem movie={mockMovie} />)

    const image = screen.getByAltText(mockMovie.Title)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockMovie.Poster)
    expect(image).toHaveAttribute('alt', mockMovie.Title)
  })

  test('영화 상세 페이지로 이동하는 링크가 올바른 href를 가진다', () => {
    render(<MovieItem movie={mockMovie} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/movies/${mockMovie.imdbID}`)
  })

  test('포스터 보기 버튼을 클릭하면 포스터 페이지로 이동한다', async () => {
    const user = userEvent.setup()
    render(<MovieItem movie={mockMovie} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith(`/poster/${mockMovie.imdbID}`)
  })
})
