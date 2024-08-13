import { BadRequestError } from '@/application/errors/bad-request-error'
import { throwError } from '@/domain/mocks/mock-shared'
import { faker } from '@faker-js/faker'
import { CreateGrupoUsecase, type InputCreateGrupo } from '@/application/usecases/grupo//create-grupo-usecase'
import { type CreateGrupoRepository } from '@/application/protocols/grupo/create-grupo-repository'
import { mockCreateGrupoRepository } from '@/application/mocks/mock-grupo'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'

describe('CreateGrupoUsecase', () => {
  let mockProps: InputCreateGrupo
  let createGrupoRepositoryStub: CreateGrupoRepository
  let sut: CreateGrupoUsecase
  beforeEach(() => {
    mockProps = { descricao: faker.person.firstName() }
    createGrupoRepositoryStub = mockCreateGrupoRepository()
    sut = new CreateGrupoUsecase(createGrupoRepositoryStub)
  })
  test('Should throws error when descricao not provided', async () => {
    mockProps = Object.assign(mockGrupoProps({}), { descricao: null })
    const promise = sut.execute(mockProps)
    await expect(promise).rejects.toThrow(new BadRequestError('Input data not providade'))
  })
  test('Should call createGrupoRepository with correct params', async () => {
    const createSpy = jest.spyOn(createGrupoRepositoryStub, 'create')
    await sut.execute(mockProps)
    expect(createSpy).toHaveBeenCalledWith(mockProps)
  })
  test('Should throw if createGrupoRepository throws', async () => {
    jest.spyOn(createGrupoRepositoryStub, 'create').mockImplementationOnce(throwError)
    const promise = sut.execute(mockProps)
    await expect(promise).rejects.toThrow()
  })
  test('Should create a GrupoEntity on success', async () => {
    const grupoEntity = await sut.execute(mockProps)
    expect(grupoEntity.id).toBeDefined()
    expect(grupoEntity.descricao).toEqual(mockProps.descricao)
  })
})
