import { type MarcaProps } from 'src/domain/entities/marca.entity'
import { type MarcaValidator, MarcaValidatorFactory } from '../../marcar.validator'
import { mockMarcaProps } from '../../../tests/mocks/mock-marca'

describe('MarcaValidator', () => {
  let sut: MarcaValidator
  let props: MarcaProps
  beforeEach(() => {
    sut = MarcaValidatorFactory()
    props = mockMarcaProps({})
  })
  describe('descricao field', () => {
    test('Should return error if no descricao provided', () => {
      const isValid = sut.validate({ descricao: '' })
      expect(isValid).toBeFalsy()
      expect(sut.errors?.descricao).toStrictEqual([
        'descricao should not be empty'
      ])
    })
    test('Should return error if descricao is not string', () => {
      const isValid = sut.validate({ ...props, descricao: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors?.descricao).toStrictEqual([
        'descricao must be a string',
        'descricao must be shorter than or equal to 50 characters'
      ])
    })
    test('Should return error if descricao is more than 50 caracterer', () => {
      const isValid = sut.validate({ ...props, descricao: 'a'.repeat(51) })
      expect(isValid).toBeFalsy()
      expect(sut.errors?.descricao).toStrictEqual([
        'descricao must be shorter than or equal to 50 characters'
      ])
    })
  })
})
