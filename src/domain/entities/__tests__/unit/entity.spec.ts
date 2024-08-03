import { Entity } from '../../entity'
import { faker } from '@faker-js/faker'

type StubProps = {
  prop1: string
  prop2: number
}
class StubEntity extends Entity<StubProps> {}

describe('UserEntity', () => {
  test('Should return null id if not provided', () => {
    const props: StubProps = { prop1: 'value1', prop2: 2 }
    const entity = new StubEntity(props)
    expect(entity.id).toBeNull()
    expect(entity.id).toBeFalsy()
  })
  test('Should accept a valid id', () => {
    const props: StubProps = { prop1: 'value1', prop2: 2 }
    const id = faker.number.int()
    const entity = new StubEntity(props, id)
    expect(entity.id).not.toBeNull()
    expect(entity.id).toBeTruthy()
  })
  test('Should convert a entity to a Javascript Object', () => {
    const props: StubProps = { prop1: 'value1', prop2: 2 }
    const id = faker.number.int()
    const entity = new StubEntity(props, id)
    expect(entity.toJSON()).toStrictEqual({ id, ...props })
  })
})
