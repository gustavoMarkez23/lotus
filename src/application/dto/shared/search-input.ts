import { type SortDirection } from '@/application/protocols/shared/searchable-repository'

export type SearchInput<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
  filterField?: Filter | null
}
