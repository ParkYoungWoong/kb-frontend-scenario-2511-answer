import Image from 'next/image'
import { oswald } from '@/styles/fonts'
import type { DetailedMovie } from '@/hooks/movies'

type Context = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Context) {
  const { id } = await params
  const res = await fetch(
    `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`,
    { cache: 'force-cache' }
  )
  const movie: DetailedMovie = await res.json()
  return {
    title: movie.Title,
    description: movie.Plot,
    openGraph: {
      title: movie.Title,
      description: movie.Plot,
      type: 'website',
      images: movie.Poster,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/movies/${id}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: 'ko_KR'
    }
  }
}

export default async function MovieDetail({ params }: Context) {
  const { id } = await params
  const res = await fetch(
    `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`,
    { cache: 'force-cache' }
  )
  const movie: DetailedMovie = await res.json()
  return (
    <section className="flex gap-[70px] text-white/50 max-xl:gap-[30px] max-sm:block">
      <Image
        src={movie.Poster.replace('SX300', 'SX700')}
        alt={movie.Title}
        width="500"
        height="750"
        className="h-[750px] w-[500px] flex-shrink-0 rounded-[10px] bg-[var(--color-area)] bg-cover max-xl:h-[450px] max-xl:w-[300px]"
      />
      <div className="flex-grow">
        <h1
          className={`${oswald.className} mb-[30px] text-[70px] leading-none text-white max-sm:mt-[50px] max-sm:text-[50px]`}>
          {movie.Title}
        </h1>
        <ul className="mb-5 flex flex-wrap text-[var(--color-primary)]">
          <li>{movie.Released}</li>
          <li className="before:mx-[10px] before:content-['/']">
            {movie.Runtime}
          </li>
          <li className="before:mx-[10px] before:content-['/']">
            {movie.Country}
          </li>
        </ul>
        <p className="mb-6">{movie.Plot}</p>
        <div>
          <h3 className="mt-6 mb-1.5 text-xl text-white">Ratings</h3>
          {movie.Ratings.map(rating => (
            <p key={rating.Source}>
              {rating.Source} - {rating.Value}
            </p>
          ))}
        </div>
        <div>
          <h3 className="mt-6 mb-1.5 text-xl text-white">Actors</h3>
          <p>{movie.Actors}</p>
        </div>
        <div>
          <h3 className="mt-6 mb-1.5 text-xl text-white">Director</h3>
          <p>{movie.Director}</p>
        </div>
        <div>
          <h3 className="mt-6 mb-1.5 text-xl text-white">Production</h3>
          <p>{movie.Production}</p>
        </div>
        <div>
          <h3 className="mt-6 mb-1.5 text-xl text-white">Genre</h3>
          <p>{movie.Genre}</p>
        </div>
      </div>
    </section>
  )
}
