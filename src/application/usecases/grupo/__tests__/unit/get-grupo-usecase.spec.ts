import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { throwError } from '@/domain/mocks/mock-shared'
import { faker } from '@faker-js/faker'
import { GetGrupoUsecase } from '@/application/usecases/grupo//get-grupo-usecase'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'
import { GrupoEntity } from '@/domain/entities/grupo.entity'
import { mockGetGrupoRepository } from '@/application/mocks/mock-grupo'

describe('GetGrupoUsecase', () => {
  let getGrupoRepositoryStub: GetGrupoRepository
  let sut: GetGrupoUsecase
  let id: number
  beforeEach(() => {
    id = faker.number.int()
    getGrupoRepositoryStub = mockGetGrupoRepository()
    sut = new GetGrupoUsecase(getGrupoRepositoryStub)
  })
  test('Should call GetGrupoRepository with correctly values', async () => {
    const spyGet = jest.spyOn(getGrupoRepositoryStub, 'findById')
    await sut.execute({ id })
    expect(spyGet).toHaveBeenCalledWith(id)
  })
  test('Should throw if GetGrupoRepository throws', async () => {
    jest.spyOn(getGrupoRepositoryStub, 'findById').mockImplementationOnce(throwError)
    const promise = sut.execute({ id })
    await expect(promise).rejects.toThrow()
  })
  test('Should return a GrupoEntity on success', async () => {
    const entity = new GrupoEntity(mockGrupoProps({}), id)
    jest.spyOn(getGrupoRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(entity))
    const output = await sut.execute({ id: Number(entity.id) })
    expect(output).toMatchObject(entity.toJSON())
  })
})
