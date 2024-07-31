import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { CreateMarca } from '@/application/use-cases/marca/create-marca'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type CreateEntityRepository } from '@/application/protocols/shared/create-entity-repository'
import { MarcaEntity, type MarcaProps } from '@/domain/entities/marca.entity'
import { CreateEntityRepositoryStub } from '@/application/mocks/mock-marca'

describe('CreateMarca', () => {
  let mockProps: MarcaProps
  let createEntityRepositoryStub: CreateEntityRepository<MarcaEntity>
  let sut: CreateMarca
  beforeEach(() => {
    mockProps = mockMarcaProps({})
    createEntityRepositoryStub = new CreateEntityRepositoryStub()
    sut = new CreateMarca(createEntityRepositoryStub)
  })
  test('Should throws error when descricao not provided', async () => {
    mockProps = Object.assign(mockMarcaProps({}), { descricao: null })
    const promise = sut.execute(mockProps)
    await expect(promise).rejects.toThrow(new BadRequestError('Input data not providade'))
  })
  test('Should call createEntityRepository with correct params', async () => {
    const createSpy = jest.spyOn(createEntityRepositoryStub, 'create')
    await sut.execute(mockProps)
    expect(createSpy).toHaveBeenCalledWith(new MarcaEntity(mockProps))
  })
  test('Should throw if createEntityRepository throws', async () => {
    jest.spyOn(createEntityRepositoryStub, 'create').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.execute(mockProps)
    await expect(promise).rejects.toThrow()
  })
})
