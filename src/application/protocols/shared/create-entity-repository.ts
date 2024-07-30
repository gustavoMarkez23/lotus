import { type Entity } from '@/domain/entities/entity'

export interface CreateEntityRepository<E extends Entity> {
  create(entity: E): Promise<E>
}
