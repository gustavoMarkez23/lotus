import { mockMarcaProps } from '@/domain/mocks/mock-marca'
import { MarcaEntity } from '../../marca.entity'
import { EntityValidationError } from '@/domain/errors/validation-error'

describe('MarcaEntity', () => {
  describe('Contructor method', () => {
    test('Should throw an error when creating a marca with invalid descricao', () => {
      const marcaMock = mockMarcaProps({})
      expect(() => new MarcaEntity({ ...marcaMock, descricao: null } as any)).toThrow(EntityValidationError)

      expect(() => new MarcaEntity({ ...marcaMock, descricao: '' })).toThrow(EntityValidationError)

      expect(() => new MarcaEntity({ ...marcaMock, descricao: 'a'.repeat(51) })).toThrow(EntityValidationError)

      expect(() => new MarcaEntity({ ...marcaMock, descricao: 123 as any })).toThrow(EntityValidationError)
    })
  })
})
