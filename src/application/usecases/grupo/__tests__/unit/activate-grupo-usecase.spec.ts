import { throwError } from '@/domain/mocks/mock-shared'
import { faker } from '@faker-js/faker'
import { ActivateGrupoUsecase, type InputActivateGrupo } from '@/application/usecases/grupo/activate-grupo-usecase'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { type UpdateGrupoRepository } from '@/application/protocols/grupo/update-grupo-repository'
import { mockGetGrupoRepository, mockUpdateGrupoRepository } from '@/application/mocks/mock-grupo'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'
import { GrupoEntity } from '@/domain/entities/grupo.entity'

describe('ActivateGrupoUsecase', () => {
  let mockInput: InputActivateGrupo
  let getGrupoRepositoryStub: GetGrupoRepository
  let updateGrupoRepositoryStub: UpdateGrupoRepository
  let sut: ActivateGrupoUsecase

  beforeEach(() => {
    mockInput = { id: faker.number.int() }
    getGrupoRepositoryStub = mockGetGrupoRepository()
    updateGrupoRepositoryStub = mockUpdateGrupoRepository()
    sut = new ActivateGrupoUsecase(getGrupoRepositoryStub, updateGrupoRepositoryStub)
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
      ativo: true
    }))
  })
  test('Should throw if UpdateGrupoRepository throws', async () => {
    jest.spyOn(updateGrupoRepositoryStub, 'update').mockImplementationOnce(throwError)
    const promise = sut.execute(mockInput)
    await expect(promise).rejects.toThrow()
  })
  test('Should activate a GrupoEntity on success', async () => {
    const grupoEntity = await sut.execute(mockInput)
    expect(grupoEntity.id).toBeDefined()
    expect(grupoEntity.ativo).toBe(true)
    expect(grupoEntity.deletedAt).toBeNull()
  })
})
