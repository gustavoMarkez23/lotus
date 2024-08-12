import { SortDirection } from '@/application/protocols/shared/searchable-repository'
import { type InputListMarca } from '@/application/usecases/marca/list-marca'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class ListMarcaDto implements InputListMarca {
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
