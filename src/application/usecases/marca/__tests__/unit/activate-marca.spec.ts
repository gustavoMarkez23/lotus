import { mockGetMarcaRepository, mockUpdateMarcaRepository } from '@/application/mocks/mock-marca'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { throwError } from '@/domain/mocks/mock-shared'
import { faker } from '@faker-js/faker'
import { ActivateMarcaUsecase, type InputActivateMarca } from '@/application/usecases/marca/activate-marca'

describe('ActivateMarcaUsecase', () => {
  let mockInput: InputActivateMarca
  let getMarcaRepositoryStub: GetMarcaRepository
  let updateMarcaRepositoryStub: UpdateMarcaRepository
  let sut: ActivateMarcaUsecase

  beforeEach(() => {
    mockInput = { id: faker.number.int() }
    getMarcaRepositoryStub = mockGetMarcaRepository()
    updateMarcaRepositoryStub = mockUpdateMarcaRepository()
    sut = new ActivateMarcaUsecase(getMarcaRepositoryStub, updateMarcaRepositoryStub)
  })
  test('Should call GetMarcaRepository with correct values', async () => {
    const spyFindById = jest.spyOn(getMarcaRepositoryStub, 'findById')
    await sut.execute(mockInput)
    expect(spyFindById).toHaveBeenCalledWith(mockInput.id)
  })
  test('Should throw if GetMarcaRepository throws', async () => {
    jest.spyOn(getMarcaRepositoryStub, 'findById').mockImplementationOnce(throwError)
    const promise = sut.execute(mockInput)
    await expect(promise).rejects.toThrow()
  })
  test('Should call UpdateMarcaRepository with correct values', async () => {
    const mockMarcaEntity = new MarcaEntity(mockMarcaProps({}), mockInput.id)
    jest.spyOn(getMarcaRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(mockMarcaEntity))
    const spyUpdate = jest.spyOn(updateMarcaRepositoryStub, 'update')
    await sut.execute(mockInput)
    expect(spyUpdate).toHaveBeenCalledWith(expect.objectContaining({
      id: mockInput.id,
      ativo: true
    }))
  })
  test('Should throw if UpdateMarcaRepository throws', async () => {
    jest.spyOn(updateMarcaRepositoryStub, 'update').mockImplementationOnce(throwError)
    const promise = sut.execute(mockInput)
    await expect(promise).rejects.toThrow()
  })
  test('Should activate a MarcaEntity on success', async () => {
    const marcaEntity = await sut.execute(mockInput)
    expect(marcaEntity.id).toBeDefined()
    expect(marcaEntity.ativo).toBe(true)
    expect(marcaEntity.deletedAt).toBeNull()
  })
})
