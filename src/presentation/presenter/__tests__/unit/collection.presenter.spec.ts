import { instanceToPlain } from 'class-transformer'
import { CollectionPresenter } from '@/presentation/presenter/shared-presenter'

class StubCollectionPresenter extends CollectionPresenter {
  data = [1, 2, 3]
}

describe('CollectionPresenter unit tests', () => {
  let sut: StubCollectionPresenter

  beforeEach(() => {
    sut = new StubCollectionPresenter({
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
      total: 4
    })
  })

  it('should presenter data', () => {
    const output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      data: [1, 2, 3],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        total: 4
      }
    })
  })
})
