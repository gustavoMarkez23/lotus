import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { CollectionPresenter } from './shared-presenter'
import { type OutputListMarca } from '@/application/usecases/marca/list-marca'

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

export class MarcaCollectionPresenter extends CollectionPresenter {
  data: MarcaPresenter[]
  constructor (output: OutputListMarca) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map(item => new MarcaPresenter(item))
  }
}
