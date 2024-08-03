import { MarcaEntity } from '@/domain/entities/marca.entity'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { throwError } from '@/domain/mocks/mock-shared'
import { faker } from '@faker-js/faker'
import { GetMarca } from '@/application/use-cases/marca/get-marca'
import { GetMarcaRepositoryStub } from '@/application/mocks/mock-marca'

describe('GetMarca', () => {
  let getMarcaRepositoryStub: GetMarcaRepositoryStub
  let sut: GetMarca
  let id: number
  beforeEach(() => {
    id = faker.number.int()
    getMarcaRepositoryStub = new GetMarcaRepositoryStub()
    sut = new GetMarca(getMarcaRepositoryStub)
  })
  test('Should call GetMarcaRepository with correctly values', async () => {
    const spyGet = jest.spyOn(getMarcaRepositoryStub, 'get')
    await sut.execute({ id })
    expect(spyGet).toHaveBeenCalledWith({ id })
  })
  test('Should throw if GetMarcaRepository throws', async () => {
    jest.spyOn(getMarcaRepositoryStub, 'get').mockImplementationOnce(throwError)
    const promise = sut.execute({ id })
    await expect(promise).rejects.toThrow()
  })
  test('Should return a MarcaEntity on success', async () => {
    const entity = new MarcaEntity(mockMarcaProps({}), id)
    jest.spyOn(getMarcaRepositoryStub, 'get').mockReturnValueOnce(Promise.resolve(entity))
    const output = await sut.execute({ id: Number(entity.id) })
    expect(output).toMatchObject(entity.toJSON())
  })
})
