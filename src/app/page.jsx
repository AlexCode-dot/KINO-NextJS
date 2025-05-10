import MovieCard from '@/components/MovieCard'

export default function Home() {
  return (
    <>
      <h1 className="moviecard__header">Populäraste filmerna just nu</h1>
      <div>
        <MovieCard />
      </div>
    </>
  )
}
