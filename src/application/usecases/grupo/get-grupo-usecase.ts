import { type InputGetGrupo } from '@/application/dto/grupo/grupo-input'
import { type GrupoOutput, GrupoOutputMapper } from '@/application/dto/grupo/grupo-output'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type OutputGetGrupo = GrupoOutput
export class GetGrupoUsecase implements UseCase<InputGetGrupo, OutputGetGrupo> {
  constructor (private readonly getGrupoRepository: GetGrupoRepository) {}
  async execute (input: InputGetGrupo): Promise<GrupoOutput> {
    const output = await this.getGrupoRepository.findById(input.id)
    return GrupoOutputMapper(output)
  }
}
