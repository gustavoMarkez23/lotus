import { EntityValidationError } from '@/domain/errors/validation-error'
import { MarcaValidatorFactory } from '@/domain/validators/marca.validator'
import { Entity } from './entity'

export type MarcaProps = {
  descricao: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  ativo?: boolean
}
export class MarcaEntity extends Entity<MarcaProps> {
  constructor (protected readonly props: MarcaProps, id?: number) {
    super(props, id)
    MarcaEntity.validate(props)
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.updatedAt ?? new Date()
    this.props.ativo = this.props.ativo ?? true
  }

  update (value: string): void {
    MarcaEntity.validate({ ...this.props, descricao: value })
    this.descricao = value
  }

  private set descricao (value: string) {
    this.props.descricao = value
  }

  get descricao (): string {
    return this.props.descricao
  }

  get createdAt (): Date {
    return this.props.createdAt!
  }

  get updatedAt (): Date {
    return this.props.updatedAt!
  }

  get deletedAt (): Date | null {
    return this.props.deletedAt ?? null
  }

  get ativo (): boolean {
    return this.props.ativo!
  }

  static validate (props: MarcaProps): void {
    const validator = MarcaValidatorFactory()
    const isValid = validator.validate(props)
    if (!isValid) {
      const errors = validator.errors!
      throw new EntityValidationError(errors)
    }
  }
}
