import { Entity } from './entity'

export type MarcaProps = {
  descricao: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  ativo?: boolean
}
export class Marca extends Entity<MarcaProps> {
  constructor (protected readonly props: MarcaProps, id: number) {
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.ativo = this.props.ativo ?? true
  }
}
