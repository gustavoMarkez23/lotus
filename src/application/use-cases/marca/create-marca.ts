import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { type UseCase } from '@/domain/use-cases/shared/use-case'

export type InputCreateMarca = {
  descricao: string
}
export type OutputCreateMarca = MarcaOutput
export class CreateMarca implements UseCase<InputCreateMarca, OutputCreateMarca> {
  async execute (input: InputCreateMarca): Promise<OutputCreateMarca> {
    const { descricao } = input
    if (!descricao) throw new BadRequestError('Input data not providade')
    return await Promise.resolve(new MarcaEntity(mockMarcaProps({}), 1))
  }
}
