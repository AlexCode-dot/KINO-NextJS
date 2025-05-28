export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Filmen kunde inte hittas</h2>
        <p className="text-lg text-gray-300 mb-8">Filmen du försöker nå finns inte i vår databas.</p>
        <a href="/movies" className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg hover:bg-red-700 transition">
          Tillbaka till filmerna
        </a>
      </div>
    </div>
  )
}
