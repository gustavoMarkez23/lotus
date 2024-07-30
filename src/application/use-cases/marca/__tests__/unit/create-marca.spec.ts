import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { CreateMarca } from '../../create-marca'
import { BadRequestError } from '@/application/errors/bad-request-error'

describe('CreateMarca', () => {
  test('Should throws error when descricao not provided', async () => {
    const sut = new CreateMarca()
    const props = Object.assign(mockMarcaProps({}), { descricao: null })
    const promise = sut.execute(props)
    await expect(promise).rejects.toThrow(new BadRequestError('Input data not providade'))
  })
})
