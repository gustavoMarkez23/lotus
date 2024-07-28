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
    expect(sut.deletedAt).toEqual(props.deletedAt)
    expect(sut.updatedAt).toEqual(props.updatedAt)
    expect(sut.createdAt).toBeInstanceOf(Date)
    expect(sut.deletedAt).toBeInstanceOf(Date)
    expect(sut.updatedAt).toBeInstanceOf(Date)
    expect(sut.ativo).toEqual(props.ativo)
  })
})
