import { type GrupoProps } from '@/domain/entities/grupo.entity'
import { GrupoRules, type GrupoValidator, GrupoValidatorFactory } from '@/domain/validators/grupo.validator'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'

describe('GrupoValidator', () => {
  let sut: GrupoValidator
  let props: GrupoProps
  beforeEach(() => {
    sut = GrupoValidatorFactory()
    props = mockGrupoProps({})
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
  describe('ativo field', () => {
    test('Should return error if ativo is not boolean', () => {
      const isValid = sut.validate({ ...props, ativo: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors?.ativo).toStrictEqual([
        'ativo must be a boolean value'
      ])
    })
  })
  describe('createdAt field', () => {
    test('Should return error if createdAt is not valid Date', () => {
      const isValid = sut.validate({ ...props, createdAt: 'invalid-date' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors?.createdAt).toStrictEqual([
        'createdAt must be a Date instance'
      ])
    })
  })
  describe('updatedAt field', () => {
    test('Should return error if updatedAt is not valid Date', () => {
      const isValid = sut.validate({ ...props, updatedAt: 'invalid-date' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors?.updatedAt).toStrictEqual([
        'updatedAt must be a Date instance'
      ])
    })
  })
  describe('deletedAt field', () => {
    test('Should return error if deletedAt is not valid Date', () => {
      const isValid = sut.validate({ ...props, deletedAt: 'invalid-date' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors?.deletedAt).toStrictEqual([
        'deletedAt must be a Date instance'
      ])
    })
  })
  test('Valid case for grupo ValidatorClass', () => {
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new GrupoRules(props))
  })
})
