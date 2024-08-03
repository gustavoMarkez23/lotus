import { MarcaEntity } from '@/domain/entities/marca.entity'
import { faker } from '@faker-js/faker'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type InputCreateMarca } from '@/application/use-cases/marca/create-marca'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { type InputGetMarca } from '@/application/use-cases/marca/get-marca'

export class CreateMarcaRepositoryStub implements CreateMarcaRepository {
  async create (data: InputCreateMarca): Promise<MarcaEntity> {
    return await Promise.resolve(new MarcaEntity(data, faker.number.int()))
  }
}
export class GetMarcaRepositoryStub implements GetMarcaRepository {
  async get (data: InputGetMarca): Promise<MarcaEntity> {
    return await Promise.resolve(new MarcaEntity(mockMarcaProps({}), data.id))
  }
}
