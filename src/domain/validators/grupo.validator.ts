import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from './class-validator-fields'
import { type GrupoProps } from '@/domain/entities/grupo.entity'

export class GrupoRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
    descricao!: string

  @IsOptional()
  @IsBoolean()
    ativo?: boolean

  @IsDate()
  @IsOptional()
    createdAt?: Date

  @IsDate()
  @IsOptional()
    updatedAt?: Date

  @IsDate()
  @IsOptional()
    deletedAt?: Date

  constructor ({ ativo, createdAt, deletedAt, descricao, updatedAt }: GrupoProps) {
    Object.assign(this, { descricao, ativo, createdAt, updatedAt, deletedAt })
  }
}
export class GrupoValidator extends ClassValidatorFields<GrupoProps> {
  validate (data: GrupoProps): boolean {
    return super.validate(new GrupoRules(data))
  }
}
export const GrupoValidatorFactory = (): GrupoValidator => (new GrupoValidator())
