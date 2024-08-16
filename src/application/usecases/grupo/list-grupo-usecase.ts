import { type SearchInput } from '@/application/dto/shared/search-input'
import { PaginationOutputMapper, type PaginationOutput } from '@/application/dto/shared/pagination-output'
import { type UseCase } from '@/domain/protocols/shared/usecase'
import { type GrupoOutput, GrupoOutputMapper } from '@/application/dto/grupo/grupo-output'
import { SearchGrupoParams, type SearchGrupoRepository, type SearchGrupoResult } from '@/application/protocols/grupo/search-grupo-repository'

export type InputListGrupo = SearchInput
export type OutputListGrupo = PaginationOutput<GrupoOutput>
export class ListGrupoUsecase implements UseCase<InputListGrupo, OutputListGrupo> {
  sortableFields: string[] = ['descricao', 'createdAt']
  filtableFields: string[] = ['descricao']
  constructor (private readonly searchGrupoRepository: SearchGrupoRepository) { }
  async execute (input: InputListGrupo): Promise<OutputListGrupo> {
    const params = new SearchGrupoParams(input)
    const searchResult = await this.searchGrupoRepository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput (searchResult: SearchGrupoResult): OutputListGrupo {
    const items = searchResult.items.map(o => GrupoOutputMapper(o))
    return PaginationOutputMapper(items, searchResult)
  }
}
