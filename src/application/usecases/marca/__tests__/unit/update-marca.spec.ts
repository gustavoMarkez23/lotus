import { type UseCase } from '@/domain/protocols/shared/usecase'
import { type InputUpdateMarca, type OutputUpdateMarca } from '../../update-marca'
import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { faker } from '@faker-js/faker'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { mockGetMarcaRepository } from '@/application/mocks/mock-marca'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { throwError } from '@/domain/mocks/mock-shared'

class UpdateMarcaRepositoryStub implements UpdateMarcaRepository {
  async update (data: MarcaEntity): Promise<void> {}
}
class UpdateMarcaUsecase implements UseCase<InputUpdateMarca, OutputUpdateMarca> {
  constructor (private readonly getMarcaRepository: GetMarcaRepository, private readonly updateMarcaRepository: UpdateMarcaRepository) {}
  async execute (input: InputUpdateMarca): Promise<MarcaOutput> {
    await this.getMarcaRepository.findById(input.id)
    return new MarcaEntity(mockMarcaProps({}), input.id)
  }
}

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
    updateMarcaRepositoryStub = new UpdateMarcaRepositoryStub()
    sut = new UpdateMarcaUsecase(getMarcaRepositoryStub, updateMarcaRepositoryStub)
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
})
