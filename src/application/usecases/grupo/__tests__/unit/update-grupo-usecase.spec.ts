import { faker } from '@faker-js/faker'
import { throwError } from '@/domain/mocks/mock-shared'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type InputUpdateGrupo, UpdateGrupoUsecase } from '../../update-grupo-usecase'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { type UpdateGrupoRepository } from '@/application/protocols/grupo/update-grupo-repository'
import { mockGetGrupoRepository, mockUpdateGrupoRepository } from '@/application/mocks/mock-grupo'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'
import { GrupoEntity } from '@/domain/entities/grupo.entity'

describe('UpdateGrupoUsecase', () => {
  let mockInput: InputUpdateGrupo
  let getGrupoRepositoryStub: GetGrupoRepository
  let updateGrupoRepositoryStub: UpdateGrupoRepository
  let sut: UpdateGrupoUsecase
  beforeEach(() => {
    mockInput = {
      id: faker.number.int(),
      descricao: faker.commerce.product()
    }
    getGrupoRepositoryStub = mockGetGrupoRepository()
    updateGrupoRepositoryStub = mockUpdateGrupoRepository()
    sut = new UpdateGrupoUsecase(getGrupoRepositoryStub, updateGrupoRepositoryStub)
  })
  test('Should throws error when descricao not provided', async () => {
    await expect(async () => await sut.execute({ id: faker.number.int(), descricao: '' })).rejects.toThrow(
      new BadRequestError('Descricao not provided')
    )
  })
  test('Should call GetGrupoRepository with correct values', async () => {
    const spyFindById = jest.spyOn(getGrupoRepositoryStub, 'findById')
    await sut.execute(mockInput)
    expect(spyFindById).toHaveBeenCalledWith(mockInput.id)
  })
  test('Should throw if GetGrupoRepository throws', async () => {
    jest.spyOn(getGrupoRepositoryStub, 'findById').mockImplementationOnce(throwError)
    const promise = sut.execute(mockInput)
    await expect(promise).rejects.toThrow()
  })
  test('Should call UpdateGrupoRepository with correct values', async () => {
    const mockGrupoEntity = new GrupoEntity(mockGrupoProps({}), mockInput.id)
    jest.spyOn(getGrupoRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(mockGrupoEntity))
    const spyUpdate = jest.spyOn(updateGrupoRepositoryStub, 'update')
    await sut.execute(mockInput)
    expect(spyUpdate).toHaveBeenCalledWith(expect.objectContaining({
      id: mockInput.id,
      descricao: mockInput.descricao
    }))
  })
  test('Should throw if UpdateGrupoRepository throws', async () => {
    jest.spyOn(updateGrupoRepositoryStub, 'update').mockImplementationOnce(throwError)
    const promise = sut.execute(mockInput)
    await expect(promise).rejects.toThrow()
  })
  test('Should update a GrupoEntity on success', async () => {
    const mockGrupoEntity = new GrupoEntity(mockGrupoProps({}), mockInput.id)
    mockGrupoEntity.update(mockInput.descricao)
    jest.spyOn(getGrupoRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(mockGrupoEntity))
    const grupoEntity = await sut.execute(mockInput)
    expect(grupoEntity.id).toBeDefined()
    expect(grupoEntity.descricao).toEqual(mockInput.descricao)
  })
})
