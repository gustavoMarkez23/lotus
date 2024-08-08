import { type SearchResult } from '@/application/protocols/shared/searchable-repository'
import { type Entity } from '@/domain/entities/entity'

export type PaginationOutput<Item = any> = {
  items: Item[]
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}
export const PaginationOutputMapper = <Item = any>(items: Item[], result: SearchResult<Entity>): PaginationOutput<Item> => {
  const { total, currentPage, lastPage, perPage } = result
  return {
    items, total, currentPage, lastPage, perPage
  }
}
