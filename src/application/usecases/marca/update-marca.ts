import { MarcaOutputMapper, type MarcaOutput } from '@/application/dto/marca/marca-output'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type InputUpdateMarca = {
  id: number
  descricao: string
}
export type OutputUpdateMarca = MarcaOutput
export class UpdateMarcaUsecase implements UseCase<InputUpdateMarca, OutputUpdateMarca> {
  constructor (private readonly getMarcaRepository: GetMarcaRepository, private readonly updateMarcaRepository: UpdateMarcaRepository) {}
  async execute (input: InputUpdateMarca): Promise<MarcaOutput> {
    if (!input.descricao) throw new BadRequestError('Descricao not provided')
    const marcaEntity = await this.getMarcaRepository.findById(input.id)
    marcaEntity.update(input.descricao)
    await this.updateMarcaRepository.update(marcaEntity)
    return MarcaOutputMapper(marcaEntity)
  }
}
