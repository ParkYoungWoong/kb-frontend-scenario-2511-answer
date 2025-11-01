'use client'
import { useMovies, useMoviesStore } from '@/hooks/movies'
import Button from '@/components/Button'

export default function SearchBar() {
  const inputText = useMoviesStore(state => state.inputText)
  const setInputText = useMoviesStore(state => state.setInputText)
  const setSearchText = useMoviesStore(state => state.setSearchText)
  const resetMovies = useMoviesStore(state => state.resetMovies)
  const { isFetching } = useMovies()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchText(inputText)
  }

  return (
    <form
      className="mb-[30px] flex gap-[10px]"
      onSubmit={onSubmit}>
      <input
        data-testid="input-text"
        type="text"
        placeholder="Search for a movie"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        className="h-[50px] flex-grow rounded border-none bg-[var(--color-area)] px-5 text-base text-[var(--color-white)] outline-none placeholder:text-[var(--color-white-30)]"
      />
      <Button
        data-testid="button-reset"
        type="button"
        onClick={() => resetMovies()}>
        Reset
      </Button>
      <Button
        data-testid="button-search"
        type="submit"
        style={{ width: '150px' }}
        color="primary"
        loading={isFetching}
        loadingColor="dark">
        Search
      </Button>
    </form>
  )
}
