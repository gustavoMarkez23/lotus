import { MarcaOutputMapper, type MarcaOutput } from '@/application/dto/marca/marca-output'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { type UseCase } from '@/application/use-cases/shared/use-case'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'

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
