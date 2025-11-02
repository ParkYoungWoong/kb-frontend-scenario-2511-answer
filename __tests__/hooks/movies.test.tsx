import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMovies, useMoviesStore, getInitialState } from '@/hooks/movies'
import mockMovies from '@/__mocks__/movies.json'
import axios from 'axios'

// axios 모킹
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// QueryClient Provider 래퍼
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false // 기본적으로 지수 백오프로 3회를 재시도하므로, 테스트를 위해 비활성화
      }
    }
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}
let wrapper: React.FC<{ children: React.ReactNode }>

describe('useMoviesStore', () => {
  beforeEach(() => {
    // 각 테스트 전 스토어 초기화
    useMoviesStore.setState(getInitialState())
  })

  test('setInputText가 inputText를 업데이트한다', async () => {
    useMoviesStore.setState({ inputText: 'frozen' })
    const { inputText } = useMoviesStore.getState()
    expect(inputText).toBe('frozen')
  })

  test('setSearchText가 searchText를 업데이트한다', async () => {
    useMoviesStore.getState().setSearchText('frozen')
    const { searchText } = useMoviesStore.getState()
    expect(searchText).toBe('frozen')
  })

  test('setMessage가 message를 업데이트한다', async () => {
    useMoviesStore.setState({ message: 'Custom message' })
    const { message } = useMoviesStore.getState()
    expect(message).toBe('Custom message')
  })

  test('resetMovies가 모든 상태를 초기화한다', async () => {
    useMoviesStore.setState({ inputText: 'frozen' })
    useMoviesStore.getState().resetMovies()
    const { inputText, searchText, message } = useMoviesStore.getState()
    expect(inputText).toBe('')
    expect(searchText).toBe('')
    expect(message).toBe('Search for the movie title!')
  })
})

describe('useMovies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useMoviesStore.setState(getInitialState())
    wrapper = createWrapper()
  })

  test('searchText가 비어있을 때 빈 배열을 반환한다', async () => {
    const { result } = renderHook(() => useMovies(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([])
    expect(mockedAxios.get).not.toHaveBeenCalled()
  })

  test('searchText가 있을 때 API를 호출하고 영화 목록을 반환한다', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockMovies })
    useMoviesStore.setState({ searchText: 'frozen' })
    const { result } = renderHook(() => useMovies(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockMovies.Search)
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/movies?title=frozen')
  })

  test('API가 False Response를 반환할 때 에러를 던진다', async () => {
    const errorMessage = 'Movie not found!'
    mockedAxios.get.mockResolvedValue({
      data: {
        Response: 'False',
        Error: errorMessage
      }
    })
    useMoviesStore.setState({ searchText: '존재하지 않는 영화 검색' })
    const { result } = renderHook(() => useMovies(), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 2000
    })
    const { message } = useMoviesStore.getState()
    expect(message).toBe(errorMessage)
  })

  test('공백만 있는 searchText는 빈 배열을 반환한다', async () => {
    useMoviesStore.setState({ searchText: '  ' }) // 공백 문자로 검색
    const { result } = renderHook(() => useMovies(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([])
    expect(mockedAxios.get).not.toHaveBeenCalled()
  })

  test('isFetching이 로딩 상태를 올바르게 반영한다', async () => {
    mockedAxios.get.mockImplementation(() => {
      return new Promise(resolve =>
        setTimeout(() => resolve({ data: mockMovies }), 100)
      )
    })
    useMoviesStore.setState({ searchText: 'frozen' })

    const { result } = renderHook(() => useMovies(), { wrapper })

    expect(result.current.isFetching).toBe(true)
    await waitFor(() => expect(result.current.isFetching).toBe(false))
  })
})
