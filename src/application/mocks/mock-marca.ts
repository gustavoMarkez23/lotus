import { type MarcaEntity } from '@/domain/entities/marca.entity'
import { type CreateEntityRepository } from '../protocols/shared/create-entity-repository'

export class CreateEntityRepositoryStub implements CreateEntityRepository<MarcaEntity> {
  async create (entity: MarcaEntity): Promise<MarcaEntity> {
    return await Promise.resolve(entity)
  }
}
