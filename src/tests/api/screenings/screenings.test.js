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

jest.unstable_mockModule('@/lib/db/screeningDbService', () => ({
  __esModule: true,
  getAllScreeningsWithMovieInfo: jest.fn(),
  createScreening: jest.fn(),
  deleteScreeningById: jest.fn(),
  getScreeningById: jest.fn(),
  updateBookedSeats: jest.fn(),
}))

jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
  __esModule: true,
  requireAdminAccess: jest.fn(() => true),
}))

let POST, GET, DELETE
let screeningService
let cookies

beforeAll(async () => {
  const headers = await import('next/headers')
  cookies = headers.cookies

  screeningService = await import('@/lib/db/screeningDbService')
  const routeModule = await import('@/app/api/screenings/route')
  const deleteModule = await import('@/app/api/screenings/[id]/route')
  POST = routeModule.POST
  GET = routeModule.GET
  DELETE = deleteModule.DELETE
})

beforeEach(() => {
  jest.clearAllMocks()
  const token = jwt.sign({ username: 'admin', admin: true }, process.env.JWT_SECRET || 'test')
  cookies.mockReturnValue({ get: () => ({ value: token }) })
})

describe('POST /api/screenings (mocked)', () => {
  test('creates a new screening', async () => {
    const mockScreening = { _id: '1', room: 'A' }
    screeningService.createScreening.mockResolvedValue(mockScreening)

    const formData = new FormData()
    formData.set('movieId', 'movie1')
    formData.set('date', new Date().toISOString())
    formData.set('room', 'A')

    const req = { formData: async () => formData }
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data).toEqual(mockScreening)
  })

  test('blocks non-admin user', async () => {
    jest.resetModules()

    jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
      __esModule: true,
      requireAdminAccess: jest.fn(() => false),
    }))

    const { POST: MockedPOST } = await import('@/app/api/screenings/route')

    const req = { formData: async () => new FormData() }
    const res = await MockedPOST(req)
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.error).toMatch(/Endast tillgängligt för administratörer/i)
  })

  test('returns 400 on missing fields', async () => {
    const formData = new FormData()
    formData.set('movieId', '')
    formData.set('date', '')
    formData.set('room', '')

    const req = { formData: async () => formData }
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toMatch(/alla fält/i)
  })
})

describe('GET /api/screenings (mocked)', () => {
  test('returns all screenings', async () => {
    const mockScreenings = [{ _id: '1', movie: { title: 'Interstellar' } }]
    screeningService.getAllScreeningsWithMovieInfo.mockResolvedValue(mockScreenings)

    const res = await GET()
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toEqual(mockScreenings)
  })
})

describe('DELETE /api/screenings/[id] (mocked)', () => {
  test('deletes a screening', async () => {
    const mockDeleted = { _id: '1', room: 'A' }
    screeningService.deleteScreeningById.mockResolvedValue(mockDeleted)

    const res = await DELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.deletedScreening).toEqual(mockDeleted)
  })

  test('blocks non-admin user', async () => {
    jest.resetModules()

    jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
      __esModule: true,
      requireAdminAccess: jest.fn(() => false),
    }))

    const { DELETE: MockedDELETE } = await import('@/app/api/screenings/[id]/route')

    const res = await MockedDELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.error).toMatch(/Endast tillgängligt för administratörer/i)
  })
})
