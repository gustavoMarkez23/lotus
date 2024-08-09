import { MarcaEntity } from '@/domain/entities/marca.entity'
import { faker } from '@faker-js/faker'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type InputCreateMarca } from '@/application/usecases/marca/create-marca'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'

export const mockCreateMarcaRepository = (): CreateMarcaRepository => {
  class CreateMarcaRepositoryStub implements CreateMarcaRepository {
    async create (data: InputCreateMarca): Promise<MarcaEntity> {
      return await Promise.resolve(new MarcaEntity(data, faker.number.int()))
    }
  }
  return new CreateMarcaRepositoryStub()
}
export const mockGetMarcaRepository = (): GetMarcaRepository => {
  class GetMarcaRepositoryStub implements GetMarcaRepository {
    async findById (id: number): Promise<MarcaEntity> {
      return await Promise.resolve(new MarcaEntity(mockMarcaProps({}), id))
    }
  }
  return new GetMarcaRepositoryStub()
}
