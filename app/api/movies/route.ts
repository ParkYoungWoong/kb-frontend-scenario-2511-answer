import axios from 'axios'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title')
  const { data } = await axios.get(
    `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}`
  )
  return Response.json(data)
}
