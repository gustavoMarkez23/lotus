import { type InputGetGrupo } from '@/application/dto/grupo/grupo-input'
import { type GrupoOutput, GrupoOutputMapper } from '@/application/dto/grupo/grupo-output'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { type UpdateGrupoRepository } from '@/application/protocols/grupo/update-grupo-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type InputActivateGrupo = InputGetGrupo
export type OutputActivateGrupo = GrupoOutput
export class ActivateGrupoUsecase implements UseCase<InputActivateGrupo, OutputActivateGrupo> {
  constructor (
    private readonly getGrupoRepository: GetGrupoRepository,
    private readonly updateGrupoRepository: UpdateGrupoRepository
  ) {}

  async execute (input: InputGetGrupo): Promise<GrupoOutput> {
    const entity = await this.getGrupoRepository.findById(input.id)
    entity.activate()
    await this.updateGrupoRepository.update(entity)
    return GrupoOutputMapper(entity)
  }
}
