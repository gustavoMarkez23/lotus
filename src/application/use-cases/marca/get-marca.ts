import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { type UseCase } from '@/application/use-cases/shared/use-case'
import { type GetMarcaRepositiry } from '@/application/protocols/marca/get-marca-repository'

export type InputGetMarca = {
  id: number
}
export type OutputGetMarca = MarcaOutput
export class GetMarca implements UseCase<InputGetMarca, OutputGetMarca> {
  constructor (private readonly getMarcaRepository: GetMarcaRepositiry) {}
  async execute (input: InputGetMarca): Promise<MarcaOutput> {
    const output = await this.getMarcaRepository.get(input)
    return output
  }
}
