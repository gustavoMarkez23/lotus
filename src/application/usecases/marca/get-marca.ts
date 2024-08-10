import { type InputGetMarca } from '@/application/dto/marca/marca-input'
import { MarcaOutputMapper, type MarcaOutput } from '@/application/dto/marca/marca-output'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type OutputGetMarca = MarcaOutput
export class GetMarca implements UseCase<InputGetMarca, OutputGetMarca> {
  constructor (private readonly getMarcaRepository: GetMarcaRepository) {}
  async execute (input: InputGetMarca): Promise<MarcaOutput> {
    const output = await this.getMarcaRepository.findById(input.id)
    return MarcaOutputMapper(output)
  }
}
