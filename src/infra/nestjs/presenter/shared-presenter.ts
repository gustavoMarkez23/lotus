import { Exclude, Expose, Transform } from 'class-transformer'

export type PaginationPresenterProps = {
  currentPage: number
  perPage: number
  lastPage: number
  total: number
}
export class PaginationPresenter {
  @Transform(({ value }) => parseInt(value))
    currentPage: number

  @Transform(({ value }) => parseInt(value))
    perPage: number

  @Transform(({ value }) => parseInt(value))
    lastPage: number

  @Transform(({ value }) => parseInt(value))
    total: number

  constructor (props: PaginationPresenterProps) {
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.lastPage = props.lastPage
    this.total = props.total
  }
}

export abstract class CollectionPresenter {
  @Exclude()
  protected paginationPresenter: PaginationPresenter

  constructor (props: PaginationPresenter) {
    this.paginationPresenter = new PaginationPresenter(props)
  }

  abstract get data ()
  @Expose()
  get meta (): PaginationPresenter {
    return this.paginationPresenter
  }
}
