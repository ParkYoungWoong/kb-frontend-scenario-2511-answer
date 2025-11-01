'use client'
import { useMovies, useMoviesStore } from '@/hooks/movies'
import MovieItem from '@/components/MovieItem'

export default function MovieList() {
  const message = useMoviesStore(state => state.message)
  const { data: movies } = useMovies()

  return (
    <div className="rounded bg-[var(--color-area)] p-5">
      {!movies?.length && message && (
        <p className="text-center text-[var(--color-primary)] opacity-50">
          {message}
        </p>
      )}
      <ul className="flex flex-wrap justify-center gap-5">
        {movies?.map(movie => (
          <MovieItem
            key={`/movies/${movie.imdbID}`}
            movie={movie}
          />
        ))}
      </ul>
    </div>
  )
}
