import { type MarcaEntity } from '@/domain/entities/marca.entity'
import { type SearchableRepository, SearchParams, SearchResult } from '../shared/searchable-repository'

export type SearchMarcaFilter = string
export class SearchMarcaParams extends SearchParams<SearchMarcaFilter> {}
export class SearchMarcaResult extends SearchResult<MarcaEntity, SearchMarcaFilter> {}
export interface SearchMarcaRepository extends SearchableRepository<MarcaEntity, SearchMarcaFilter, SearchMarcaParams, SearchResult<MarcaEntity, SearchMarcaFilter>> {}
