import { expect, jest, test, describe, beforeAll, beforeEach } from '@jest/globals'
import jwt from 'jsonwebtoken'

jest.unstable_mockModule('next/headers', () => ({
  __esModule: true,
  cookies: jest.fn(),
}))

jest.unstable_mockModule('@/lib/db/connectDB', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.unstable_mockModule('@/lib/db/roomDbService', () => ({
  __esModule: true,
  getAllRooms: jest.fn(),
  createRoom: jest.fn(),
  deleteRoomAndScreenings: jest.fn(),
  getRoomById: jest.fn(),
}))

jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
  __esModule: true,
  requireAdminAccess: jest.fn(() => true),
}))

let GET, POST, DELETE
let roomService
let cookies

beforeAll(async () => {
  const headers = await import('next/headers')
  cookies = headers.cookies

  roomService = await import('@/lib/db/roomDbService')
  const routeModule = await import('@/app/api/rooms/route')
  const deleteModule = await import('@/app/api/rooms/[id]/route')
  GET = routeModule.GET
  POST = routeModule.POST
  DELETE = deleteModule.DELETE
})

beforeEach(() => {
  jest.clearAllMocks()
  const token = jwt.sign({ username: 'admin', admin: true }, process.env.JWT_SECRET || 'test')
  cookies.mockReturnValue({ get: () => ({ value: token }) })
})

describe('GET /api/rooms', () => {
  test('returns all rooms', async () => {
    const mockRooms = [{ name: 'Room A' }]
    roomService.getAllRooms.mockResolvedValue(mockRooms)

    const res = await GET()
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toEqual(mockRooms)
  })
})

describe('POST /api/rooms', () => {
  test('creates a room', async () => {
    const input = {
      name: 'Room A',
      rows: [
        { rowNumber: 1, seats: 8 },
        { rowNumber: 2, seats: 10 },
      ],
      wheelchairSeats: [
        { row: 2, seat: 1 },
        { row: 2, seat: 10 },
      ],
    }

    const mockRoom = { ...input, _id: '1' }
    roomService.createRoom.mockResolvedValue(mockRoom)

    const req = { json: async () => input }
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data).toEqual(mockRoom)
  })

  test('returns 400 if room name already exists', async () => {
    const input = {
      name: 'Room Duplicate',
      rows: [{ rowNumber: 1, seats: 8 }],
      wheelchairSeats: [],
    }

    roomService.createRoom.mockRejectedValue(new Error('En salong med detta namn finns redan, testa ett nytt namn!'))

    const req = { json: async () => input }
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toMatch(/finns redan/i)
  })

  test('returns 400 if input invalid', async () => {
    const req = { json: async () => ({ name: 'Missing rows' }) }

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toMatch(/invalid/i)
  })

  test('blocks non-admin users', async () => {
    jest.resetModules()

    jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
      __esModule: true,
      requireAdminAccess: jest.fn(() => false),
    }))

    const { POST: MockedPOST } = await import('@/app/api/rooms/route')

    const req = {
      json: async () => ({
        name: 'Room A',
        rows: [{ rowNumber: 1, seats: 5 }],
        wheelchairSeats: [],
      }),
    }

    const res = await MockedPOST(req)
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.error).toMatch(/Endast tillgängligt för administratörer/i)
  })
})

describe('DELETE /api/rooms/[id]', () => {
  test('deletes a room and its screenings', async () => {
    roomService.deleteRoomAndScreenings.mockResolvedValue()

    const res = await DELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.message).toMatch(/raderades/i)
  })

  test('returns 404 if room not found', async () => {
    roomService.deleteRoomAndScreenings.mockRejectedValue(new Error('Salongen kunde inte hittas'))

    const res = await DELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(404)
    expect(data.error).toMatch(/kunde inte hittas/i)
  })

  test('blocks non-admin users', async () => {
    jest.resetModules()

    jest.unstable_mockModule('@/lib/auth/requireAdminAccess', () => ({
      __esModule: true,
      requireAdminAccess: jest.fn(() => false),
    }))

    const { DELETE: MockedDELETE } = await import('@/app/api/rooms/[id]/route')

    const res = await MockedDELETE({}, { params: { id: '1' } })
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.error).toMatch(/Endast tillgängligt för administratörer/i)
  })
})
