import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { faker } from '@faker-js/faker'
import { instanceToPlain } from 'class-transformer'
import { MarcaPresenter } from '@/presentation/presenter/marca-presenter'

describe('MarcaPresenter', () => {
  let sut: MarcaPresenter
  const createdAt = new Date()
  const props: MarcaOutput = {
    id: faker.number.int(),
    descricao: faker.string.sample(50),
    ativo: true,
    createdAt,
    updatedAt: null,
    deletedAt: null
  }
  beforeEach(() => {
    sut = new MarcaPresenter(props)
  })
  test('Should set values', () => {
    expect(sut.id).toEqual(props.id)
    expect(sut.descricao).toEqual(props.descricao)
    expect(sut.ativo).toEqual(props.ativo)
    expect(sut.createdAt).toEqual(props.createdAt)
    expect(sut.updatedAt).toEqual(props.updatedAt)
    expect(sut.deletedAt).toEqual(props.deletedAt)
  })
  test('Should presenter data', () => {
    const output = instanceToPlain(sut)
    expect(output).toStrictEqual({ ...props, createdAt: createdAt.toISOString() })
  })
})
