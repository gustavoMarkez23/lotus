import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { GetMarcaRepositiryStub } from '@/application/mocks/mock-marca'
import { type GetMarcaRepositiry } from '@/application/protocols/marca/get-marca-repository'
import { type UseCase } from '@/application/use-cases/shared/use-case'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { throwError } from '@/domain/mocks/mock-shared'
import { faker } from '@faker-js/faker'

export type InputGetMarca = {
  id: number
}
export type OutputGetMarca = MarcaOutput
class GetMarca implements UseCase<InputGetMarca, OutputGetMarca> {
  constructor (private readonly getMarcaRepository: GetMarcaRepositiry) {}
  async execute (input: InputGetMarca): Promise<MarcaOutput> {
    const output = await this.getMarcaRepository.get(input)
    return output
  }
}
describe('GetMarca', () => {
  let getMarcaRepositiryStub: GetMarcaRepositiryStub
  let sut: GetMarca
  let id: number
  beforeEach(() => {
    id = faker.number.int()
    getMarcaRepositiryStub = new GetMarcaRepositiryStub()
    sut = new GetMarca(getMarcaRepositiryStub)
  })
  test('Should call GetMarcaRepository with correctly values', async () => {
    const spyGet = jest.spyOn(getMarcaRepositiryStub, 'get')
    await sut.execute({ id })
    expect(spyGet).toHaveBeenCalledWith({ id })
  })
  test('Should throw if GetMarcaRepository throws', async () => {
    jest.spyOn(getMarcaRepositiryStub, 'get').mockImplementationOnce(throwError)
    const promise = sut.execute({ id })
    await expect(promise).rejects.toThrow()
  })
  test('Should return a MarcaEntity on success', async () => {
    const entity = new MarcaEntity(mockMarcaProps({}), id)
    jest.spyOn(getMarcaRepositiryStub, 'get').mockReturnValueOnce(Promise.resolve(entity))
    const output = await sut.execute({ id: Number(entity.id) })
    expect(output).toMatchObject(entity)
  })
})
