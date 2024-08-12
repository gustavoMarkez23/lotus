import { faker } from '@faker-js/faker'
import { GrupoEntity, type GrupoProps } from '@/domain/entities/grupo.entity'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'

describe('GrupoEntity', () => {
  let props: GrupoProps
  let sut: GrupoEntity
  beforeEach(() => {
    GrupoEntity.validate = jest.fn()
    props = mockGrupoProps({ deletedAt: faker.date.anytime(), updatedAt: faker.date.anytime() })
    sut = new GrupoEntity(props, faker.number.int())
  })
  test('Constructor method', () => {
    expect(GrupoEntity.validate).toHaveBeenCalled()
    expect(sut.descricao).toEqual(props.descricao)
    expect(sut.createdAt).toEqual(props.createdAt)
    expect(sut.createdAt).toBeInstanceOf(Date)
    expect(sut.deletedAt).toEqual(props.deletedAt)
    expect(sut.deletedAt).toBeInstanceOf(Date)
    expect(sut.updatedAt).toEqual(props.updatedAt)
    expect(sut.updatedAt).toBeInstanceOf(Date)
    expect(sut.ativo).toEqual(props.ativo)
  })
  test('Getter of descricao field', () => {
    expect(sut.descricao).toBeDefined()
    expect(sut.descricao).toEqual(props.descricao)
    expect(typeof sut.descricao).toEqual('string')
  })
  test('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toEqual(props.createdAt)
    expect(sut.createdAt).toBeInstanceOf(Date)
  })
  test('Getter of deletedAt field', () => {
    expect(sut.deletedAt).toBeDefined()
    expect(sut.deletedAt).toEqual(props.deletedAt)
    expect(sut.deletedAt).toBeInstanceOf(Date)
  })
  test('Getter of deletedAt field', () => {
    const sut = new GrupoEntity({ ...mockGrupoProps({}), deletedAt: null as any })
    expect(sut.deletedAt).toBeDefined()
    expect(sut.deletedAt).toEqual(null)
  })
  test('Getter of updatedAt field', () => {
    expect(sut.updatedAt).toBeDefined()
    expect(sut.updatedAt).toEqual(props.updatedAt)
    expect(sut.updatedAt).toBeInstanceOf(Date)
  })
  test('Getter of ativo field', () => {
    expect(sut.ativo).toBeDefined()
    expect(sut.ativo).toEqual(props.ativo)
    expect(typeof sut.ativo).toEqual('boolean')
  })
  test('Getter of ativo field should return true if not provided', () => {
    const sut = new GrupoEntity({ ...mockGrupoProps({}), ativo: null as any })
    expect(sut.ativo).toBeDefined()
    expect(typeof sut.ativo).toEqual('boolean')
    expect(sut.ativo).toEqual(true)
  })
})
