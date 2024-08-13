import { type GrupoOutput, GrupoOutputMapper } from '@/application/dto/grupo/grupo-output'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type CreateGrupoRepository } from '@/application/protocols/grupo/create-grupo-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type InputCreateGrupo = {
  descricao: string
}
export type OutputCreateGrupo = GrupoOutput
export class CreateGrupoUsecase implements UseCase<InputCreateGrupo, OutputCreateGrupo> {
  constructor (private readonly createEntityRepository: CreateGrupoRepository) {}
  async execute (input: InputCreateGrupo): Promise<OutputCreateGrupo> {
    const { descricao } = input
    if (!descricao) throw new BadRequestError('Input data not providade')
    const grupo = await this.createEntityRepository.create(input)
    return GrupoOutputMapper(grupo)
  }
}
