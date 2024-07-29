import { MarcaEntity, type MarcaProps } from '@/domain/entities/marca.entity'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { faker } from '@faker-js/faker'

describe('MarcaEntity', () => {
  let props: MarcaProps
  let sut: MarcaEntity
  beforeEach(() => {
    MarcaEntity.validate = jest.fn()
    props = mockMarcaProps({})
    sut = new MarcaEntity(props, faker.number.int())
  })
  test('Constructor method', () => {
    expect(MarcaEntity.validate).toHaveBeenCalled()
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
})
