import { type CreateEntityRepository } from '@/application/protocols/shared/create-entity-repository'
import { type Entity } from '@/domain/entities/entity'

export abstract class SharedInMemoryRepository<E extends Entity> implements CreateEntityRepository<E> {
  public itens: E[] = []
  async create (entity: E): Promise<E> {
    this.itens.push(entity)
    return await Promise.resolve(entity)
  }
}
