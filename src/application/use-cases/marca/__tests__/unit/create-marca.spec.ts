import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { CreateMarca } from '../../create-marca'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type CreateEntityRepository } from '@/application/protocols/shared/create-entity-repository'
import { MarcaEntity, type MarcaProps } from '@/domain/entities/marca.entity'

class CreateEntityRepositoryStub implements CreateEntityRepository<MarcaEntity> {
  async create (entity: MarcaEntity): Promise<MarcaEntity> {
    return await Promise.resolve(entity)
  }
}
describe('CreateMarca', () => {
  let props: MarcaProps
  let createEntityRepositoryStub: CreateEntityRepository<MarcaEntity>
  let sut: CreateMarca
  beforeEach(() => {
    props = mockMarcaProps({})
    createEntityRepositoryStub = new CreateEntityRepositoryStub()
    sut = new CreateMarca(createEntityRepositoryStub)
  })
  test('Should throws error when descricao not provided', async () => {
    props = Object.assign(mockMarcaProps({}), { descricao: null })
    const promise = sut.execute(props)
    await expect(promise).rejects.toThrow(new BadRequestError('Input data not providade'))
  })
  test('Should call createEntityRepository with correct params', async () => {
    const createSpy = jest.spyOn(createEntityRepositoryStub, 'create')
    await sut.execute(props)
    expect(createSpy).toHaveBeenCalledWith(new MarcaEntity(props))
  })
})
