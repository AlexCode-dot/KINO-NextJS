import { FormData } from 'formdata-node'
import { expect, jest, test, describe, beforeEach, beforeAll } from '@jest/globals'
import jwt from 'jsonwebtoken'

jest.unstable_mockModule('next/headers', () => ({
  __esModule: true,
  cookies: jest.fn(),
}))

jest.unstable_mockModule('@/lib/db/connectDB', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.unstable_mockModule('@/lib/db/movieDbService', () => ({
  __esModule: true,
  createMovieFromOmdbTitle: jest.fn(),
  findMovieByTitle: jest.fn(),
  getAllMovies: jest.fn(),
  deleteMovieAndScreenings: jest.fn(),
  findMovieById: jest.fn(),
  findMoviesByTitle: jest.fn(),
}))

jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
  __esModule: true,
  requireAdminAccess: jest.fn(() => true),
}))

let POST, GET, DELETE
let movieService
let cookies

beforeAll(async () => {
  const headers = await import('next/headers')
  cookies = headers.cookies

  movieService = await import('@/lib/db/movieDbService')
  const routeModule = await import('@/app/api/movies/route')
  const deleteModule = await import('@/app/api/movies/[id]/route')
  POST = routeModule.POST
  GET = routeModule.GET
  DELETE = deleteModule.DELETE
})

beforeEach(() => {
  jest.clearAllMocks()
  const token = jwt.sign({ username: 'admin', admin: true }, process.env.JWT_SECRET || 'test')
  cookies.mockReturnValue({ get: () => ({ value: token }) })
})

describe('POST /api/movies (mocked)', () => {
  test('creates a new movie', async () => {
    movieService.findMovieByTitle.mockResolvedValue(null)
    movieService.createMovieFromOmdbTitle.mockResolvedValue({ _id: '1', title: 'Interstellar' })

    const formData = new FormData()
    formData.set('title', 'Interstellar')

    const req = { formData: async () => formData }
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.title).toBe('Interstellar')
  })

  test('rejects duplicate movie', async () => {
    movieService.findMovieByTitle.mockResolvedValue({ _id: 'existing', title: 'Interstellar' })

    const formData = new FormData()
    formData.set('title', 'Interstellar')

    const req = { formData: async () => formData }
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toMatch(/finns redan/i)
  })

  test('rejects missing title', async () => {
    const formData = new FormData()
    const req = { formData: async () => formData }

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toMatch(/titel behövs/i)
  })

  test('blocks non-admin users', async () => {
    jest.resetModules()

    jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
      __esModule: true,
      requireAdminAccess: jest.fn(() => false),
    }))

    const { POST: MockedPOST } = await import('@/app/api/movies/route')

    const req = { formData: async () => new FormData() }
    const res = await MockedPOST(req)
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.error).toMatch(/Endast tillgängligt för administratörer/i)
  })
})

describe('GET /api/movies (mocked)', () => {
  test('returns all movies', async () => {
    const mockMovies = [{ _id: '1', title: 'Interstellar' }]
    movieService.getAllMovies.mockResolvedValue(mockMovies)

    const req = { url: 'http://localhost/api/movies' }
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toEqual(mockMovies)
    expect(movieService.getAllMovies).toHaveBeenCalled()
  })
})

describe('DELETE /api/movies/[id] (mocked)', () => {
  test('deletes movie and related screenings', async () => {
    const deletedMovie = { _id: '1', title: 'Interstellar' }
    movieService.deleteMovieAndScreenings.mockResolvedValue(deletedMovie)

    const res = await DELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.deletedMovie).toEqual(deletedMovie)
  })

  test('blocks non-admin users', async () => {
    jest.resetModules()

    jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
      __esModule: true,
      requireAdminAccess: jest.fn(() => false),
    }))

    const { DELETE: MockedDELETE } = await import('@/app/api/movies/[id]/route')

    const res = await MockedDELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.error).toMatch(/Endast tillgängligt för administratörer/i)
  })
})
