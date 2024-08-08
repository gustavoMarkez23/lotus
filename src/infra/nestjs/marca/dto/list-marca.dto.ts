import { SortDirection } from '@/application/protocols/shared/searchable-repository'
import { type InputListMarca } from '@/application/usecases/marca/list-marca'
import { IsOptional } from 'class-validator'

export class ListMarcaDto implements InputListMarca {
  @IsOptional()
    page?: number

  @IsOptional()
    perPage?: number

  @IsOptional()
    sort?: string

  @IsOptional()
    sortDir?: SortDirection

  @IsOptional()
    filter?: string

  @IsOptional()
    filterField?: string
}
