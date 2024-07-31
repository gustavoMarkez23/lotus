import { MarcaEntity } from '@/domain/entities/marca.entity'
import { type CreateEntityRepository } from '../protocols/shared/create-entity-repository'
import { faker } from '@faker-js/faker'

export class CreateEntityRepositoryStub implements CreateEntityRepository<MarcaEntity> {
  async create (entity: MarcaEntity): Promise<MarcaEntity> {
    return await Promise.resolve(new MarcaEntity(entity.toJSON(), faker.number.int()))
  }
}
