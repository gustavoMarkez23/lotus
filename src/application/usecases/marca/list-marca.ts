import { type SearchInput } from '@/application/dto/shared/search-input'
import { MarcaOutputMapper, type MarcaOutput } from '@/application/dto/marca/marca-output'
import { PaginationOutputMapper, type PaginationOutput } from '@/application/dto/shared/pagination-output'
import { SearchMarcaParams, type SearchMarcaRepository, type SearchMarcaResult } from '@/application/protocols/marca/search-marca-repository'
import { type UseCase } from '@/domain/protocols/shared/usecase'

export type InputListMarca = SearchInput
export type OutputListMarca = PaginationOutput<MarcaOutput>
export class ListMarca implements UseCase<InputListMarca, OutputListMarca> {
  sortableFields: string[] = ['descricao', 'createdAt']
  filtableFields: string[] = ['descricao']
  constructor (private readonly searchMarcaRepository: SearchMarcaRepository) { }
  async execute (input: InputListMarca): Promise<OutputListMarca> {
    const params = new SearchMarcaParams(input)
    const searchResult = await this.searchMarcaRepository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput (searchResult: SearchMarcaResult): OutputListMarca {
    const items = searchResult.items.map(o => MarcaOutputMapper(o))
    return PaginationOutputMapper(items, searchResult)
  }
}
