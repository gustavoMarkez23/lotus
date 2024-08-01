import { Entity } from '@/domain/entities/entity'
import { SharedInMemoryRepository } from '@/infra/db/in-memory/shared-in-memory-repository'

type StubEntityProps = {
  name: string
  price: number
}
class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends SharedInMemoryRepository<StubEntity> {}

describe('SharedInMemoryRepository', () => {
  let sut: StubInMemoryRepository
  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })
  test('Should create a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 10 })
    await sut.create(entity)
    expect(entity.toJSON()).toStrictEqual(sut.itens[0].toJSON())
  })
})
