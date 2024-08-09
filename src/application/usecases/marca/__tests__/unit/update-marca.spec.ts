import { type UseCase } from '@/domain/protocols/shared/usecase'
import { type InputUpdateMarca, type OutputUpdateMarca } from '../../update-marca'
import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { faker } from '@faker-js/faker'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { mockGetMarcaRepository } from '@/application/mocks/mock-marca'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'

class UpdateMarcaRepositoryStub implements UpdateMarcaRepository {
  async update (data: MarcaEntity): Promise<void> {}
}
class UpdateMarcaUsecaseStub implements UseCase<InputUpdateMarca, OutputUpdateMarca> {
  constructor (private readonly getMarcaRepository: GetMarcaRepository, private readonly updateMarcaRepository: UpdateMarcaRepository) {}
  async execute (input: InputUpdateMarca): Promise<MarcaOutput> {
    await this.getMarcaRepository.findById(input.id)
    return new MarcaEntity(mockMarcaProps({}), input.id)
  }
}

describe('UpdateMarca', () => {
  test('Should call GetMarcaRepository with correct values', async () => {
    const mockInput: InputUpdateMarca = {
      id: faker.number.int(),
      descricao: faker.commerce.product()
    }
    const getMarcaRepositoryStub = mockGetMarcaRepository()
    const updateMarcaRepositoryStub = new UpdateMarcaRepositoryStub()
    const sut = new UpdateMarcaUsecaseStub(getMarcaRepositoryStub, updateMarcaRepositoryStub)
    const spyFindById = jest.spyOn(getMarcaRepositoryStub, 'findById')
    await sut.execute(mockInput)
    expect(spyFindById).toHaveBeenCalledWith(mockInput.id)
  })
})
