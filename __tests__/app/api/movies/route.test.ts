import { GET } from '@/app/api/movies/route'
import axios from 'axios'
import mockMovies from '@/__mocks__/movies.json'

// axios 모킹
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('GET /api/movies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('title 파라미터로 OMDB API를 호출하고 응답을 반환한다', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockMovies })

    const request = new Request('http://localhost:3000/api/movies?title=Frozen')
    const response = await GET(request)
    const data = await response.json()

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Frozen`
    )
    expect(data).toEqual(mockMovies)
  })

  test('API_KEY가 환경변수에서 올바르게 사용된다', async () => {
    process.env.OMDB_API_KEY = 'custom-api-key'

    mockedAxios.get.mockResolvedValue({
      data: mockMovies
    })

    const request = new Request('http://localhost:3000/api/movies?title=test')
    await GET(request)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://omdbapi.com/?apikey=custom-api-key&s=test'
    )
  })
})
