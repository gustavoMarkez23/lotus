import { MarcaOutputMapper, type MarcaOutput } from '@/application/dto/marca/marca-output'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { type UseCase } from '@/application/use-cases/shared/use-case'
import { type CreateEntityRepository } from '@/application/protocols/shared/create-entity-repository'

export type InputCreateMarca = {
  descricao: string
}
export type OutputCreateMarca = MarcaOutput
export class CreateMarca implements UseCase<InputCreateMarca, OutputCreateMarca> {
  constructor (private readonly createEntityRepository: CreateEntityRepository<MarcaEntity>) {}
  async execute (input: InputCreateMarca): Promise<OutputCreateMarca> {
    const { descricao } = input
    if (!descricao) throw new BadRequestError('Input data not providade')
    const entity = new MarcaEntity(input)
    const marca = await this.createEntityRepository.create(entity)
    return MarcaOutputMapper(marca)
  }
}
