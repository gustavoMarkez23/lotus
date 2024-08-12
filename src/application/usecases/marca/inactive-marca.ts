import { type InputGetMarca } from '@/application/dto/marca/marca-input'
import { type MarcaOutput, MarcaOutputMapper } from '@/application/dto/marca/marca-output'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type InputActivateMarca = InputGetMarca
export type OutputActivateMarca = MarcaOutput
export class InactiveMarcaUsecase implements UseCase<InputActivateMarca, OutputActivateMarca> {
  constructor (
    private readonly getMarcaRepository: GetMarcaRepository,
    private readonly updateMarcaRepository: UpdateMarcaRepository
  ) {}

  async execute (input: InputGetMarca): Promise<MarcaOutput> {
    const entity = await this.getMarcaRepository.findById(input.id)
    entity.inactive()
    await this.updateMarcaRepository.update(entity)
    return MarcaOutputMapper(entity)
  }
}
