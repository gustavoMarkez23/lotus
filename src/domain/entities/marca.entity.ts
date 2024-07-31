import { EntityValidationError } from '../errors/validation-error'
import { MarcaValidatorFactory } from '../validators/marcar.validator'
import { Entity } from './entity'

export type MarcaProps = {
  descricao: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  ativo?: boolean
}
export class MarcaEntity extends Entity<MarcaProps> {
  constructor (protected readonly props: MarcaProps, id?: number) {
    super(props, id)
    MarcaEntity.validate(props)
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.ativo = this.props.ativo ?? true
  }

  get descricao (): string {
    return this.props.descricao
  }

  get createdAt (): Date | null {
    return this.props.createdAt ?? null
  }

  get updatedAt (): Date | null {
    return this.props.updatedAt ?? null
  }

  get deletedAt (): Date | null {
    return this.props.deletedAt ?? null
  }

  get ativo (): boolean {
    return this.props.ativo ?? true
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
