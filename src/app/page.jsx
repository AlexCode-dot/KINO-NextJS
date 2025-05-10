import MovieCard from '@/components/MovieCard'
import ScreeningCards from '@/components/ScreeningCard'

export default function Home() {
  return (
    <>
      <h1 className="moviecard__header">Populäraste filmerna just nu</h1>
      <div>
        <MovieCard />
      </div>
      <h1 className="screeningcard__header">Visningar för de fem kommande dagarna</h1>
      <div>
        <ScreeningCards />
      </div>
    </>
  )
}
