import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '@/components/SearchBar'
import { useMovies, useMoviesStore } from '@/hooks/movies'

// hooks 모킹
const mockSetInputText = jest.fn()
const mockSetSearchText = jest.fn()
const mockResetMovies = jest.fn()

type MovieStoreState = {
  inputText: string
  setInputText: (text: string) => void
  setSearchText: (text: string) => void
  resetMovies: () => void
}

jest.mock('@/hooks/movies', () => ({
  useMovies: jest.fn(),
  useMoviesStore: jest.fn((selector: (state: MovieStoreState) => unknown) => {
    const state = {
      inputText: '',
      setInputText: mockSetInputText,
      setSearchText: mockSetSearchText,
      resetMovies: mockResetMovies
    }
    return selector(state)
  })
}))

describe('<SearchBar>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useMovies as jest.Mock).mockReturnValue({
      isFetching: false
    })
  })

  test('검색 바가 정상적으로 렌더링된다', () => {
    render(<SearchBar />)

    expect(screen.getByTestId('input-text')).toBeInTheDocument()
    expect(screen.getByTestId('button-reset')).toBeInTheDocument()
    expect(screen.getByTestId('button-search')).toBeInTheDocument()
  })

  test('입력 필드에 텍스트를 입력하면 setInputText가 호출된다', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByTestId('input-text')
    await user.type(input, 'Frozen')

    expect(mockSetInputText).toHaveBeenCalled()
  })

  test('Reset 버튼을 클릭하면 resetMovies가 호출된다', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const resetButton = screen.getByTestId('button-reset')
    await user.click(resetButton)

    expect(mockResetMovies).toHaveBeenCalledTimes(1)
  })

  test('form 제출 시 setSearchText가 호출된다', async () => {
    const user = userEvent.setup()
    const testInputText = 'Frozen'

    ;(useMoviesStore as unknown as jest.Mock).mockImplementation(
      (selector: (state: MovieStoreState) => unknown) => {
        const state = {
          inputText: testInputText,
          setInputText: mockSetInputText,
          setSearchText: mockSetSearchText,
          resetMovies: mockResetMovies
        }
        return selector(state)
      }
    )

    render(<SearchBar />)

    const searchButton = screen.getByTestId('button-search')
    await user.click(searchButton)

    expect(mockSetSearchText).toHaveBeenCalledWith(testInputText)
  })

  test('isFetching이 true일 때 Search 버튼에 로딩 상태가 표시된다', () => {
    ;(useMovies as jest.Mock).mockReturnValue({
      isFetching: true
    })

    render(<SearchBar />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('Search 버튼은 submit 타입이다', () => {
    render(<SearchBar />)

    const searchButton = screen.getByTestId('button-search')
    expect(searchButton).toHaveAttribute('type', 'submit')
  })
})
