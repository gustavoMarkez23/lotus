import { prismaMock } from '@/infra/database/prisma/helpers/prisma-helper-mock'
import { throwError } from '@/domain/mocks/mock-shared'
import prismaHelper from '@/infra/database/prisma/helpers/prisma-helper'
import { Test } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { PrismaService } from '@/presentation/services/prisma.service'
import { DatabaseModule } from '@/presentation/modules/database.module'
import { GrupoPrismaRepository } from '@/infra/database/prisma/grupo/grupo-prisma-repository'
import { GrupoEntity } from '@/domain/entities/grupo.entity'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'

describe('GrupoPrismaRepository', () => {
  let fakeId: number
  const prismaService = prismaHelper
  let sut: GrupoPrismaRepository
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile()
  })
  beforeEach(() => {
    fakeId = faker.number.int()
    sut = new GrupoPrismaRepository(prismaService as any)
  })
  describe('create()', () => {
    test('Should throws if prisma throw', async () => {
      prismaMock.grupo.create.mockImplementationOnce(throwError)
      const promise = sut.create(new GrupoEntity(mockGrupoProps({})))
      await expect(promise).rejects.toThrow()
    })
    test('Should return a GrupoEntity on success', async () => {
      const mockGrupo = { ...mockGrupoProps({}), id: faker.number.int() }
      prismaMock.grupo.create.mockResolvedValueOnce(mockGrupo as any)
      const grupo = await sut.create(mockGrupo)
      expect(grupo).toBeTruthy()
      expect(grupo.descricao).toEqual(mockGrupo.descricao)
      expect(grupo.createdAt).toEqual(mockGrupo.createdAt)
    })
  })
  describe('findUnique()', () => {
    test('Should throws if prisma throw', async () => {
      prismaMock.grupo.findUnique.mockImplementationOnce(throwError)
      const entity = new GrupoEntity(mockGrupoProps({}))
      const promise = sut.findById(Number(entity.id))
      await expect(promise).rejects.toThrow()
    })
    test('should finds a entity by id', async () => {
      const entity = new GrupoEntity(mockGrupoProps({}), fakeId)
      prismaMock.grupo.findUniqueOrThrow.mockResolvedValue(
        { ...entity.toJSON(), deletedAt: null }
      )
      const output = await sut.findById(fakeId)
      expect(output).toBeTruthy()
      expect(output.toJSON()).toStrictEqual(entity.toJSON())
    })
  })
  describe('update()', () => {
    test('Should throws if prisma throw', async () => {
      prismaMock.grupo.update.mockImplementationOnce(throwError)
      const entity = new GrupoEntity(mockGrupoProps({}), fakeId)
      const promise = sut.update(entity)
      await expect(promise).rejects.toThrow()
    })
    test('Should update a entity', async () => {
      const mockEntity = new GrupoEntity(mockGrupoProps({}))
      prismaMock.grupo.update.mockResolvedValue(mockEntity.toJSON())
      await sut.update(mockEntity)
    })
  })
})
