import { render, screen } from '@testing-library/react'
import MovieList from '@/components/MovieList'
import { useMovies, useMoviesStore } from '@/hooks/movies'
import mockMovies from '@/__mocks__/movies.json'

// hooks 모킹
jest.mock('@/hooks/movies', () => ({
  useMovies: jest.fn(),
  useMoviesStore: jest.fn()
}))

// Next.js 모듈 모킹
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('<MovieList>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('영화 목록이 정상적으로 렌더링된다', () => {
    ;(useMovies as jest.Mock).mockReturnValue({
      data: mockMovies.Search
    })

    render(<MovieList />)

    expect(screen.getByText('Frozen II')).toBeInTheDocument()
    expect(screen.getByText('Ghostbusters: Frozen Empire')).toBeInTheDocument()
  })

  test('영화 목록이 비어있고 메시지가 있을 때 메시지가 표시된다', () => {
    const testMessage = '검색된 영화가 없습니다.'
    ;(useMoviesStore as unknown as jest.Mock).mockReturnValue(testMessage)
    ;(useMovies as jest.Mock).mockReturnValue({
      data: []
    })

    render(<MovieList />)

    expect(screen.getByText(testMessage)).toBeInTheDocument()
  })

  test('영화 목록이 있을 때는 메시지가 표시되지 않는다', () => {
    const testMessage = '검색된 영화를 표시합니다.'
    ;(useMoviesStore as unknown as jest.Mock).mockReturnValue(testMessage)
    ;(useMovies as jest.Mock).mockReturnValue({
      data: mockMovies.Search
    })

    render(<MovieList />)

    expect(screen.getByText('Frozen II')).toBeInTheDocument()
    expect(screen.queryByText(testMessage)).not.toBeInTheDocument()
  })

  test('영화 목록이 undefined일 때 메시지가 표시된다', () => {
    const testMessage = '검색된 영화가 없습니다.'
    ;(useMoviesStore as unknown as jest.Mock).mockReturnValue(testMessage)
    ;(useMovies as jest.Mock).mockReturnValue({
      data: undefined
    })

    render(<MovieList />)

    expect(screen.getByText(testMessage)).toBeInTheDocument()
  })
})
