import { MarcaOutputMapper, type MarcaOutput } from '@/application/dto/marca/marca-output'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type InputCreateMarca = {
  descricao: string
}
export type OutputCreateMarca = MarcaOutput
export class CreateMarca implements UseCase<InputCreateMarca, OutputCreateMarca> {
  constructor (private readonly createEntityRepository: CreateMarcaRepository) {}
  async execute (input: InputCreateMarca): Promise<OutputCreateMarca> {
    const { descricao } = input
    if (!descricao) throw new BadRequestError('Input data not providade')
    const marca = await this.createEntityRepository.create(input)
    return MarcaOutputMapper(marca)
  }
}
