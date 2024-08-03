import { MarcaEntity } from '@/domain/entities/marca.entity'
import { faker } from '@faker-js/faker'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type InputCreateMarca } from '@/application/use-cases/marca/create-marca'
import { type GetMarcaRepositiry } from '../protocols/marca/get-marca-repository'
import { type InputGetMarca } from '../use-cases/marca/__tests__/unit/get-marca.spec'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'

export class CreateMarcaRepositoryStub implements CreateMarcaRepository {
  async create (data: InputCreateMarca): Promise<MarcaEntity> {
    return await Promise.resolve(new MarcaEntity(data, faker.number.int()))
  }
}
export class GetMarcaRepositiryStub implements GetMarcaRepositiry {
  async get (data: InputGetMarca): Promise<MarcaEntity> {
    return await Promise.resolve(new MarcaEntity(mockMarcaProps({}), data.id))
  }
}
