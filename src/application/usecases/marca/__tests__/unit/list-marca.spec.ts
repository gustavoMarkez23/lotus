import { type SearchMarcaParams, type SearchMarcaRepository } from '@/application/protocols/marca/search-marca-repository'
import { ListMarca } from '@/application/usecases/marca/list-marca'
import { SearchResult } from '@/application/protocols/shared/searchable-repository'
import { MarcaEntity } from '@/domain/entities/marca.entity'
import { mockMarcaProps } from '@/domain/mocks/mock-marca'

class SearchMarcaRepositoryStub implements SearchMarcaRepository {
  items: MarcaEntity[] = []
  sortableFields: string[] = ['descricao', 'createdAt']
  filtableFields: string[] = ['descricao']
  async search (props: SearchMarcaParams): Promise<SearchResult<MarcaEntity, string>> {
    const { page, perPage, sort, sortDir, filter } = props
    return await Promise.resolve(new SearchResult({
      items: this.items,
      total: this.items.length,
      currentPage: page,
      perPage,
      sort,
      sortDir,
      filter
    }))
  }
}
describe('ListMarcaUseCase', () => {
  let sut: ListMarca
  let repository: SearchMarcaRepositoryStub
  beforeEach(() => {
    repository = new SearchMarcaRepositoryStub()
    sut = new ListMarca(repository)
  })
  test('should return the users ordered by createdAt', async () => {
    const createdAt = new Date()
    const items = [
      new MarcaEntity(mockMarcaProps({ createdAt })),
      new MarcaEntity(mockMarcaProps({ createdAt: new Date(createdAt.getTime() + 1) }))
    ]
    repository.items = items
    const output = await sut.execute({ sort: 'createdAt', sortDir: 'asc' })
    expect(output).toStrictEqual({
      items: items.map((item) => item.toJSON()),
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 15
    })
  })
})
