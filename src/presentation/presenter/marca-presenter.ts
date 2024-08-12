import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { CollectionPresenter } from './shared-presenter'
import { type OutputListMarca } from '@/application/usecases/marca/list-marca'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class MarcaPresenter {
  @ApiProperty({ description: 'Identificação da marca' })
    id: number

  @ApiProperty({ description: 'Descrição da marca' })
    descricao: string

  @ApiProperty({ description: 'Data de criação da marca' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date

  @ApiProperty({ description: 'Data de alteração da marca' })
  @Transform(({ value }: { value: Date | null }) => value ? value.toISOString() : null)
    updatedAt: Date | null

  @ApiProperty({ description: 'Data de exclusão da marca' })
  @Transform(({ value }: { value: Date | null }) => value ? value.toISOString() : null)
    deletedAt: Date | null

  @ApiProperty({ description: 'Status da marca' })
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
