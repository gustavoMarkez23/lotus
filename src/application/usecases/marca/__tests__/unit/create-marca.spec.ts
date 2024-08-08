import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { CreateMarca, type InputCreateMarca } from '@/application/usecases/marca/create-marca'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { throwError } from '@/domain/mocks/mock-shared'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { CreateMarcaRepositoryStub } from '@/application/mocks/mock-marca'
import { faker } from '@faker-js/faker'

describe('CreateMarca', () => {
  let mockProps: InputCreateMarca
  let createMarcaRepositoryStub: CreateMarcaRepository
  let sut: CreateMarca
  beforeEach(() => {
    mockProps = { descricao: faker.person.firstName() }
    createMarcaRepositoryStub = new CreateMarcaRepositoryStub()
    sut = new CreateMarca(createMarcaRepositoryStub)
  })
  test('Should throws error when descricao not provided', async () => {
    mockProps = Object.assign(mockMarcaProps({}), { descricao: null })
    const promise = sut.execute(mockProps)
    await expect(promise).rejects.toThrow(new BadRequestError('Input data not providade'))
  })
  test('Should call createEntityRepository with correct params', async () => {
    const createSpy = jest.spyOn(createMarcaRepositoryStub, 'create')
    await sut.execute(mockProps)
    expect(createSpy).toHaveBeenCalledWith(mockProps)
  })
  test('Should throw if createEntityRepository throws', async () => {
    jest.spyOn(createMarcaRepositoryStub, 'create').mockImplementationOnce(throwError)
    const promise = sut.execute(mockProps)
    await expect(promise).rejects.toThrow()
  })
  test('Should create a MarcaEntity on success', async () => {
    const marcaEntity = await sut.execute(mockProps)
    expect(marcaEntity.id).toBeDefined()
    expect(marcaEntity.descricao).toEqual(mockProps.descricao)
  })
})
