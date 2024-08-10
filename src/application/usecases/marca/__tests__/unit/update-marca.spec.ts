import { UpdateMarcaUsecase, type InputUpdateMarca } from '@/application/usecases/marca/update-marca'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { faker } from '@faker-js/faker'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { mockGetMarcaRepository, mockUpdateMarcaRepository } from '@/application/mocks/mock-marca'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { throwError } from '@/domain/mocks/mock-shared'
import { BadRequestError } from '@/application/errors/bad-request-error'

describe('UpdateMarca', () => {
  let mockInput: InputUpdateMarca
  let getMarcaRepositoryStub: GetMarcaRepository
  let updateMarcaRepositoryStub: UpdateMarcaRepository
  let sut: UpdateMarcaUsecase
  beforeEach(() => {
    mockInput = {
      id: faker.number.int(),
      descricao: faker.commerce.product()
    }
    getMarcaRepositoryStub = mockGetMarcaRepository()
    updateMarcaRepositoryStub = mockUpdateMarcaRepository()
    sut = new UpdateMarcaUsecase(getMarcaRepositoryStub, updateMarcaRepositoryStub)
  })
  test('Should throws error when descricao not provided', async () => {
    await expect(async () => await sut.execute({ id: faker.number.int(), descricao: '' })).rejects.toThrow(
      new BadRequestError('Descricao not provided')
    )
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
      descricao: mockInput.descricao
    }))
  })
  test('Should throw if UpdateMarcaRepository throws', async () => {
    jest.spyOn(updateMarcaRepositoryStub, 'update').mockImplementationOnce(throwError)
    const promise = sut.execute(mockInput)
    await expect(promise).rejects.toThrow()
  })
  test('Should update a MarcaEntity on success', async () => {
    const mockMarcaEntity = new MarcaEntity(mockMarcaProps({}), mockInput.id)
    mockMarcaEntity.update(mockInput.descricao)
    jest.spyOn(getMarcaRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(mockMarcaEntity))
    const marcaEntity = await sut.execute(mockInput)
    expect(marcaEntity.id).toBeDefined()
    expect(marcaEntity.descricao).toEqual(mockInput.descricao)
  })
})
