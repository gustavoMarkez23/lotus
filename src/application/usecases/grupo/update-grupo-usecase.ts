import { type GrupoOutput, GrupoOutputMapper } from '@/application/dto/grupo/grupo-output'
import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { type UpdateGrupoRepository } from '@/application/protocols/grupo/update-grupo-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'
import { type InputUpdateMarca } from '@/application/usecases/marca/update-marca'

export type InputUpdateGrupo = {
  id: number
  descricao: string
}
export type OutputUpdateGrupo = GrupoOutput
export class UpdateGrupoUsecase implements UseCase<InputUpdateGrupo, OutputUpdateGrupo> {
  constructor (private readonly getGrupoRepository: GetGrupoRepository, private readonly updateGrupoRepository: UpdateGrupoRepository) {}
  async execute (input: InputUpdateMarca): Promise<MarcaOutput> {
    if (!input.descricao) throw new BadRequestError('Descricao not provided')
    const grupoEntity = await this.getGrupoRepository.findById(input.id)
    grupoEntity.update(input.descricao)
    await this.updateGrupoRepository.update(grupoEntity)
    return GrupoOutputMapper(grupoEntity)
  }
}
