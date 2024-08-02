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
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile()
  })
  describe('create()', () => {
    test('Should throws if prisma throw', async () => {
      const sut = new MarcaPrismaRepository(prismaService as any)
      prismaMock.marca.create.mockImplementationOnce(throwError)
      const promise = sut.create(new MarcaEntity(mockMarcaProps({})))
      await expect(promise).rejects.toThrow()
    })
  })
})
