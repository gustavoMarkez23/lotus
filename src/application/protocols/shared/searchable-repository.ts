import { type Entity } from '@/domain/entities/entity'

export type SortDirection = 'asc' | 'desc'
export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
  filterField?: Filter | null
}
export type SearchResultProps<E extends Entity, Filter> = {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: string | null
  filter: Filter | null
}
export class SearchParams<Filter = string> {
  protected _page!: number
  protected _perPage = 15
  protected _sort!: string | null
  protected _sortDir!: SortDirection | null
  protected _filter!: Filter | null
  protected _filterField!: Filter | null
  constructor (props: SearchProps<Filter> = {}) {
    this.perPage = props.perPage as any
    this.page = Number(props.page)
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
    this.filterField = props.filterField ?? null
  }

  get page (): number {
    return this._page
  }

  private set page (value: number) {
    let page = +value
    if (Number.isNaN(page) || page <= 0 || parseInt(page as any) !== page) page = 1
    this._page = page
  }

  get perPage (): number {
    return this._perPage
  }

  private set perPage (value: number) {
    let perPage = value === (true as any) ? this._perPage : +value
    if (Number.isNaN(perPage) || perPage <= 0 || parseInt(perPage as any) !== perPage) perPage = 15
    this._perPage = perPage
  }

  get sort (): string | null {
    return this._sort
  }

  private set sort (value: string | null) {
    this._sort = value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sortDir (): SortDirection | null {
    return this._sortDir!
  }

  private set sortDir (value: string | null) {
    if (!this.sort) {
      this._sortDir = null
      return
    }
    const dir = `${value}`.toLowerCase()
    this._sortDir = (dir !== 'asc' && dir !== 'desc') ? 'desc' : dir
  }

  get filter (): Filter | null {
    return this._filter
  }

  private set filter (value: Filter | null) {
    this._filter = value === null || value === undefined || value === '' ? null : String(value) as any
  }

  get filterField (): Filter | null {
    return this._filterField
  }

  private set filterField (value: Filter | null) {
    this._filterField = value === null || value === undefined || value === '' ? null : String(value) as any
  }
}
export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly currentPage: number
  readonly perPage: number
  readonly lastPage: number
  readonly sort: string | null
  readonly sortDir: string | null
  readonly filter: Filter | null
  constructor (props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.lastPage = Math.ceil(this.total / this.perPage)
    this.sort = props.sort ?? null
    this.sortDir = props.sortDir ?? null
    this.filter = props.filter ?? null
  }

  toJSON (forceEntity = false): object {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter
    }
  }
}
export interface SearchableRepository<E extends Entity, Filter = string, SearchInput = SearchParams<Filter>, SearchOutput = SearchResult<E, Filter>> {
  sortableFields: string[]
  filtableFields: string[]
  search(props: SearchInput): Promise<SearchOutput>
}
