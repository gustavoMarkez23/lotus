import { SearchResult } from '@/application/protocols/shared/searchable-repository'
import { ListGrupoUsecase } from '@/application/usecases/grupo/list-grupo-usecase'
import { type SearchGrupoParams, type SearchGrupoRepository } from '@/application/protocols/grupo/search-grupo-repository'
import { GrupoEntity } from '@/domain/entities/grupo.entity'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'

class SearchGrupoRepositoryStub implements SearchGrupoRepository {
  items: GrupoEntity[] = []
  sortableFields: string[] = ['descricao', 'createdAt']
  filtableFields: string[] = ['descricao']
  async search (props: SearchGrupoParams): Promise<SearchResult<GrupoEntity, string>> {
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
describe('ListGrupoUseCase', () => {
  let sut: ListGrupoUsecase
  let repository: SearchGrupoRepositoryStub
  beforeEach(() => {
    repository = new SearchGrupoRepositoryStub()
    sut = new ListGrupoUsecase(repository)
  })
  test('should return the users ordered by createdAt', async () => {
    const createdAt = new Date()
    const items = [
      new GrupoEntity(mockGrupoProps({ createdAt })),
      new GrupoEntity(mockGrupoProps({ createdAt: new Date(createdAt.getTime() + 1) }))
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
