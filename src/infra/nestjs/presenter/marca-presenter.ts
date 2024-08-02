import { type MarcaOutput } from '@/application/dto/marca/marca-output'

export class MarcaPresenter {
  id: number
  descricao: string
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  ativo: boolean
  constructor (output: MarcaOutput) {
    this.id = Number(output.id)
    this.descricao = output.descricao
    this.createdAt = output.createdAt
    this.updatedAt = output.updatedAt
    this.deletedAt = output.deletedAt
    this.ativo = output.ativo
  }
}
