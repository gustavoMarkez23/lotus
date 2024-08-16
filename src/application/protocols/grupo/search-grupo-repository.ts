import { type SearchableRepository, SearchParams, SearchResult } from '@/application/protocols/shared/searchable-repository'
import { type GrupoEntity } from '@/domain/entities/grupo.entity'

export type SearchGrupoFilter = string
export class SearchGrupoParams extends SearchParams<SearchGrupoFilter> {}
export class SearchGrupoResult extends SearchResult<GrupoEntity, SearchGrupoFilter> {}
export interface SearchGrupoRepository extends SearchableRepository<GrupoEntity, SearchGrupoFilter, SearchGrupoParams, SearchResult<GrupoEntity, SearchGrupoFilter>> {}
