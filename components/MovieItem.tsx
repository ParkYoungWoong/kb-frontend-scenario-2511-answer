'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { SimpleMovie } from '@/hooks/movies'
import Button from '@/components/Button'

export default function MovieItem({ movie }: { movie: SimpleMovie }) {
  const router = useRouter()
  return (
    <li className="group relative h-[300px] w-[200px] overflow-hidden rounded bg-[var(--color-black)] bg-cover hover:outline-4 hover:outline-[var(--color-primary)]">
      <Button
        circle
        className="absolute top-[10px] right-[10px] opacity-50 transition-all duration-300 group-hover:opacity-100"
        onClick={() => router.push(`/poster/${movie.imdbID}`)}>
        👀
      </Button>
      <Link
        prefetch
        href={`/movies/${movie.imdbID}`}>
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width="200"
          height="300"
        />
        <div className="absolute bottom-0 left-0 box-border w-full bg-[rgba(14,17,27,.3)] p-[14px] text-center text-base backdrop-blur-[10px]">
          <p className="text-sm text-[var(--color-primary)]">{movie.Year}</p>
          <h3 className="font-bold text-[var(--color-white)]">{movie.Title}</h3>
        </div>
      </Link>
    </li>
  )
}
