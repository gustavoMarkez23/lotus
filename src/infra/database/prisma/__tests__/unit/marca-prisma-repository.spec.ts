import { prismaMock } from '@/infra/database/prisma/helpers/prisma-helper-mock'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { throwError } from '@/domain/mocks/mock-shared'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import prismaHelper from '@/infra/database/prisma/helpers/prisma-helper'
import { Test } from '@nestjs/testing'
import { DatabaseModule } from '@/infra/database/database.module'
import { faker } from '@faker-js/faker'
import { MarcaPrismaRepository } from '@/infra/database/prisma/marca/marca-prisma-repository'

describe('MarcaPrismaRepository', () => {
  const prismaService = prismaHelper
  let sut: MarcaPrismaRepository
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile()
  })
  beforeEach(() => {
    sut = new MarcaPrismaRepository(prismaService as any)
  })
  describe('create()', () => {
    test('Should throws if prisma throw', async () => {
      prismaMock.marca.create.mockImplementationOnce(throwError)
      const promise = sut.create(new MarcaEntity(mockMarcaProps({})))
      await expect(promise).rejects.toThrow()
    })
    test('Should return a MarcaEntity on success', async () => {
      const mockMarca = { ...mockMarcaProps({}), id: faker.number.int() }
      prismaMock.marca.create.mockResolvedValueOnce(mockMarca as any)
      const marca = await sut.create(mockMarca)
      expect(marca).toBeTruthy()
      expect(marca.descricao).toEqual(mockMarca.descricao)
      expect(marca.createdAt).toEqual(mockMarca.createdAt)
    })
  })
  describe('get()', () => {
    test('Should throws if prisma throw', async () => {
      prismaMock.marca.findUnique.mockImplementationOnce(throwError)
      const entity = new MarcaEntity(mockMarcaProps({}))
      const promise = sut.findById(Number(entity.id))
      await expect(promise).rejects.toThrow()
    })
    test('should finds a entity by id', async () => {
      const fakeId = faker.number.int()
      const entity = new MarcaEntity(mockMarcaProps({}), fakeId)
      prismaMock.marca.findUniqueOrThrow.mockResolvedValue(
        { ...entity.toJSON(), deletedAt: null }
      )
      const output = await sut.findById(fakeId)
      expect(output).toBeTruthy()
      expect(output.toJSON()).toStrictEqual(entity.toJSON())
    })
  })
})
