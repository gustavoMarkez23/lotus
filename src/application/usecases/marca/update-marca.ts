import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type InputUpdateMarca = {
  id: number
  descricao: string
}
export type OutputUpdateMarca = MarcaOutput
export class UpdateMarca implements UseCase<InputUpdateMarca, OutputUpdateMarca> {
  execute (input: InputUpdateMarca): MarcaOutput | Promise<MarcaOutput> {
    throw new Error('Method not implemented.')
  }
}
