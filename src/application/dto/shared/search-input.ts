export type SortDirection = 'asc' | 'desc'
export type SearchInput<Filter = string> = {
  page?: number
  perParge?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}
