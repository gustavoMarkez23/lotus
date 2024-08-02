import { prismaMock } from '@/infra/database/prisma/helpers/prisma-helper-mock'
import { MarcaEntity, type MarcaProps } from '@/domain/entities/marca.entity'
import { throwError } from '@/domain/mocks/mock-shared'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { PrismaService } from '../../prisma.service'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import prismaHelper from '../../helpers/prisma-helper'
import { Test } from '@nestjs/testing'
import { DatabaseModule } from '@/infra/database/database.module'
import { type InputCreateMarca } from '@/application/use-cases/marca/create-marca'
import { faker } from '@faker-js/faker'

class MarcaPrismaRepository implements CreateMarcaRepository {
  constructor (private readonly prismaService: PrismaService) {}
  async create (data: InputCreateMarca): Promise<MarcaEntity> {
    const rs = await this.prismaService.marca.create({ data })
    const { id, ...datas } = rs
    return new MarcaEntity(datas as MarcaProps, id)
  }
}
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
})
