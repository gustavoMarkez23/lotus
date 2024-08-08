import { SearchParams, SearchResult } from '@/application/protocols/shared/searchable-repository'

describe('SearchableRepository', () => {
  describe('SearchParams', () => {
    test('page prop', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)
      const params = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: '', expected: 1 },
        { page: 'any', expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 }
      ]
      params.forEach((o) => { expect(new SearchParams({ page: o.page as any }).page).toBe(o.expected) }
      )
    })
    test('perPage prop', () => {
      const sut = new SearchParams()
      expect(sut.perPage).toBe(15)
      const params = [
        { perPage: null, expected: 15 },
        { perPage: undefined, expected: 15 },
        { perPage: '', expected: 15 },
        { perPage: 'any', expected: 15 },
        { perPage: 0, expected: 15 },
        { perPage: -1, expected: 15 },
        { perPage: 5.5, expected: 15 },
        { perPage: true, expected: 15 },
        { perPage: false, expected: 15 },
        { perPage: {}, expected: 15 },
        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
        { perPage: 23, expected: 23 }
      ]
      params.forEach((o) => {
        expect(new SearchParams({ perPage: o.perPage as any }).perPage).toBe(
          o.expected
        )
      }
      )
    })
    test('sortDir prop', () => {
      let sut = new SearchParams()
      expect(sut.sortDir).toBeNull()
      sut = new SearchParams({ sort: null })
      expect(sut.sortDir).toBeNull()
      sut = new SearchParams({ sort: undefined })
      expect(sut.sortDir).toBeNull()
      sut = new SearchParams({ sort: '' })
      expect(sut.sortDir).toBeNull()

      const params = [
        { sortDir: null, expected: 'desc' },
        { sortDir: undefined, expected: 'desc' },
        { sortDir: '', expected: 'desc' },
        { sortDir: 'any', expected: 'desc' },
        { sortDir: 0, expected: 'desc' },
        { sortDir: -1, expected: 'desc' },
        { sortDir: 5.5, expected: 'desc' },
        { sortDir: true, expected: 'desc' },
        { sortDir: false, expected: 'desc' },
        { sortDir: {}, expected: 'desc' },
        { sortDir: 1, expected: 'desc' },
        { sortDir: 'asc', expected: 'asc' },
        { sortDir: 'Asc', expected: 'asc' },
        { sortDir: 'desc', expected: 'desc' },
        { sortDir: 'dEsc', expected: 'desc' }
      ]
      params.forEach((o) => {
        expect(
          new SearchParams({ sort: 'field', sortDir: o.sortDir as any }).sortDir
        ).toBe(o.expected)
      }
      )
    })
    test('filter prop', () => {
      const sut = new SearchParams()
      expect(sut.filter).toBeNull()
      const params = [
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: '', expected: null },
        { filter: 'any', expected: 'any' },
        { filter: 0, expected: '0' },
        { filter: -1, expected: '-1' },
        { filter: 5.5, expected: '5.5' },
        { filter: true, expected: 'true' },
        { filter: false, expected: 'false' },
        { filter: {}, expected: '[object Object]' },
        { filter: 1, expected: '1' },
        { filter: 2, expected: '2' },
        { filter: 23, expected: '23' }
      ]
      params.forEach((o) => {
        expect(new SearchParams({ filter: o.filter as any }).filter).toBe(
          o.expected
        )
      }
      )
    })
  })
  describe('SearchResult tests', () => {
    test('constructor props', () => {
      let param = {
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        currentPage: 1,
        total: 4,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
        lastPage: 2
      }
      let sut = new SearchResult(param)
      expect(sut.toJSON()).toStrictEqual(param)

      param = { ...param, sort: 'name' as any, sortDir: 'asc' as any, filter: 'test' as any }
      sut = new SearchResult(param)
      expect(sut.toJSON()).toStrictEqual(param)

      param = { ...param, total: 54, perPage: 10 }
      sut = new SearchResult(param)
      expect(sut.lastPage).toBe(6)
    })
  })
})
