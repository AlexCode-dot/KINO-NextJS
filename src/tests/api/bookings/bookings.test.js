import { expect, jest, test, describe, beforeAll, beforeEach } from '@jest/globals'

jest.unstable_mockModule('@/lib/db/connectDB', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.unstable_mockModule('@/lib/db/bookingDbService', () => ({
  __esModule: true,
  getAllBookings: jest.fn(),
  updateBookingSeats: jest.fn(),
  deleteBookingById: jest.fn(),
}))

jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
  __esModule: true,
  requireAdminAccess: jest.fn(() => false),
}))

let GET, PATCH, DELETE
let bookingService

beforeAll(async () => {
  bookingService = await import('@/lib/db/bookingDbService')
  const routeModule = await import('@/app/api/bookings/route')
  const detailModule = await import('@/app/api/bookings/[id]/route')
  GET = routeModule.GET
  PATCH = detailModule.PATCH
  DELETE = detailModule.DELETE
})

beforeEach(() => {
  jest.clearAllMocks()
  process.env.NODE_ENV = 'development'
})

describe('GET /api/bookings (mocked)', () => {
  test('returns all bookings', async () => {
    const mockBookings = [{ _id: '1', name: 'Alex' }]
    bookingService.getAllBookings.mockResolvedValue(mockBookings)

    const res = await GET()
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toEqual(mockBookings)
  })

  test('returns 500 if DB throws error', async () => {
    bookingService.getAllBookings.mockRejectedValue(new Error('Databasfel'))

    const res = await GET()
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data.error).toMatch(/databasfel/i)
  })
})

describe('PATCH /api/bookings/:id (mocked)', () => {
  test('updates booking seats', async () => {
    const updated = { _id: '1', seats: [{ row: 1, seat: 2 }] }
    bookingService.updateBookingSeats.mockResolvedValue(updated)

    const req = {
      json: async () => ({ seats: [{ row: 1, seat: 2 }] }),
    }

    const res = await PATCH(req, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toEqual(updated)
  })

  test('returns 400 if seats array is missing or empty', async () => {
    const req = { json: async () => ({ seats: [] }) }
    const res = await PATCH(req, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toMatch(/minst en plats/i)
  })

  test('returns 400 if seats are invalid', async () => {
    const req = {
      json: async () => ({
        seats: [{ row: 'a', seat: 2 }, { seat: 3 }],
      }),
    }

    const res = await PATCH(req, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toMatch(/ogiltiga platser/i)
  })

  test('returns 500 if updateBookingSeats throws', async () => {
    bookingService.updateBookingSeats.mockRejectedValue(new Error('Kunde inte uppdatera bokning'))

    const req = {
      json: async () => ({ seats: [{ row: 1, seat: 2 }] }),
    }

    const res = await PATCH(req, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data.error).toMatch(/uppdatera bokning/i)
  })
})

describe('DELETE /api/bookings/:id (mocked)', () => {
  test('deletes a booking successfully', async () => {
    bookingService.deleteBookingById.mockResolvedValue()

    const res = await DELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.message).toMatch(/tagits bort/i)
  })

  test('returns 500 if deleteBookingById throws', async () => {
    bookingService.deleteBookingById.mockRejectedValue(new Error('Något gick fel'))

    const res = await DELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data.error).toMatch(/något gick fel/i)
  })
})
