import axios from 'axios'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { useQuery } from '@tanstack/react-query'

export type Movies = SimpleMovie[]
export interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface DetailedMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

const defaultMessage = 'Search for the movie title!'

export const useMoviesStore = create(
  combine(
    {
      inputText: '',
      searchText: '',
      message: defaultMessage
    },
    set => ({
      setInputText: (text: string) => set({ inputText: text }),
      setSearchText: (text: string) => set({ searchText: text }),
      setMessage: (message: string) => set({ message }),
      resetMovies: () =>
        set({
          inputText: '',
          searchText: '',
          message: defaultMessage
        })
    })
  )
)

export function useMovies() {
  const searchText = useMoviesStore(state => state.searchText)
  const setMessage = useMoviesStore(state => state.setMessage)
  return useQuery<SimpleMovie[]>({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      if (!searchText.trim()) return []
      const { data } = await axios.get(`/api/movies?title=${searchText}`)
      if (data.Response === 'False') {
        setMessage(data.Error)
        throw new Error(data.Error)
      }
      return data.Search
    },
    staleTime: 1000 * 60 * 60, // 1시간
    retry: 1
  })
}
