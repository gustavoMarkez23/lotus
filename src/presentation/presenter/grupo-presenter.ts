import { CollectionPresenter } from './shared-presenter'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { type GrupoOutput } from '@/application/dto/grupo/grupo-output'
import { type OutputListGrupo } from '@/application/usecases/grupo/list-grupo-usecase'

export class GrupoPresenter {
  @ApiProperty({ description: 'Identificação da grupo' })
    id: number

  @ApiProperty({ description: 'Descrição da grupo' })
    descricao: string

  @ApiProperty({ description: 'Data de criação da grupo' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
    createdAt: Date

  @ApiProperty({ description: 'Data de alteração da grupo' })
  @Transform(({ value }: { value: Date | null }) => value ? value.toISOString() : null)
    updatedAt: Date | null

  @ApiProperty({ description: 'Data de exclusão da grupo' })
  @Transform(({ value }: { value: Date | null }) => value ? value.toISOString() : null)
    deletedAt: Date | null

  @ApiProperty({ description: 'Status da grupo' })
    ativo: boolean

  constructor (output: GrupoOutput) {
    this.id = Number(output.id)
    this.descricao = output.descricao
    this.createdAt = output.createdAt
    this.updatedAt = output.updatedAt
    this.deletedAt = output.deletedAt
    this.ativo = output.ativo
  }
}

export class GrupoCollectionPresenter extends CollectionPresenter {
  data: GrupoPresenter[]
  constructor (output: OutputListGrupo) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map(item => new GrupoPresenter(item))
  }
}
