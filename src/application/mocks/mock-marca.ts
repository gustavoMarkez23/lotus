import { MarcaEntity } from '@/domain/entities/marca.entity'
import { faker } from '@faker-js/faker'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type InputCreateMarca } from '@/application/use-cases/marca/create-marca'

export class CreateMarcaRepositoryStub implements CreateMarcaRepository {
  async create (data: InputCreateMarca): Promise<MarcaEntity> {
    return await Promise.resolve(new MarcaEntity(data, faker.number.int()))
  }
}
