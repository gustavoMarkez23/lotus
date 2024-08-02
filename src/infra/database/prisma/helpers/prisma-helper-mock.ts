import { type PrismaClient } from '@prisma/client'
import { type DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import prismaHelper from './prisma-helper'

jest.mock('./prisma-helper', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})
export const prismaMock = prismaHelper as unknown as DeepMockProxy<PrismaClient>
