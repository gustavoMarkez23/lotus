import { SortDirection } from '@/application/protocols/shared/searchable-repository'
import { type InputListGrupo } from '@/application/usecases/grupo/list-grupo-usecase'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class ListGrupoDto implements InputListGrupo {
  @ApiPropertyOptional({ description: 'Página que será retornada' })
  @IsOptional()
    page?: number

  @ApiPropertyOptional({ description: 'Quantidade de registos por página' })
  @IsOptional()
    perPage?: number

  @ApiPropertyOptional({
    description: 'Coluna definida para ordenar os dados: "descricao" ou "createdAt"'
  })
  @IsOptional()
    sort?: string

  @ApiPropertyOptional({
    description: 'Ordenação dos dados: "crescente" ou "decrecente"'
  })
  @IsOptional()
    sortDir?: SortDirection

  @ApiPropertyOptional({
    description: 'Dado informado para filtrar o resultado'
  })
  @IsOptional()
    filter?: string

  @ApiPropertyOptional({
    description: 'Coluna definida para filtrar os dados: "descricao"'
  })
  @IsOptional()
    filterField?: string
}
