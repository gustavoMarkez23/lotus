import { EntityValidationError } from '@/domain/errors/validation-error'
import { GrupoValidatorFactory } from '@/domain/validators/grupo.validator'
import { Entity } from './entity'

export type GrupoProps = {
  descricao: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  ativo?: boolean
}

export class GrupoEntity extends Entity<GrupoProps> {
  constructor (protected readonly props: GrupoProps, id?: number) {
    super(props, id)
    GrupoEntity.validate(props)
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.updatedAt ?? new Date()
    this.props.ativo = this.props.ativo ?? true
  }

  update (value: string): void {
    GrupoEntity.validate({ ...this.props, descricao: value })
    this.descricao = value
  }

  activate (): void {
    GrupoEntity.validate({ ...this.props, ativo: true, deletedAt: null })
    this.ativo = true
    this.deletedAt = null
  }

  inactive (): void {
    GrupoEntity.validate({ ...this.props, ativo: false, deletedAt: new Date() })
    this.ativo = false
    this.deletedAt = new Date()
  }

  private setUpdateAt (): void {
    this.props.updatedAt = new Date()
  }

  private set descricao (value: string) {
    this.props.descricao = value
    this.setUpdateAt()
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

  private set deletedAt (value: Date | null) {
    this.props.deletedAt = value
  }

  get deletedAt (): Date | null {
    return this.props.deletedAt ?? null
  }

  private set ativo (value: boolean) {
    this.props.ativo = value
  }

  get ativo (): boolean {
    return this.props.ativo!
  }

  static validate (props: GrupoProps): void {
    const validator = GrupoValidatorFactory()
    const isValid = validator.validate(props)
    if (!isValid) {
      const errors = validator.errors!
      throw new EntityValidationError(errors)
    }
  }
}
