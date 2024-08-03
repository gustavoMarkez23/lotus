import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { type MarcaProps } from '@/domain/entities/marca.entity'
import { ClassValidatorFields } from './class-validator-fields'

export class MarcaRules {
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

  constructor ({ ativo, createdAt, deletedAt, descricao, updatedAt }: MarcaProps) {
    Object.assign(this, { descricao, ativo, createdAt, updatedAt, deletedAt })
  }
}
export class MarcaValidator extends ClassValidatorFields<MarcaProps> {
  validate (data: MarcaProps): boolean {
    return super.validate(new MarcaRules(data))
  }
}
export const MarcaValidatorFactory = (): MarcaValidator => (new MarcaValidator())
