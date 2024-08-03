import * as libClassValidator from 'class-validator'
import { ClassValidatorFields } from '@/domain/validators/class-validator-fields'

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {}
const makeSut = (): StubClassValidatorFields => (new StubClassValidatorFields())
describe('ClassValidatorFields', () => {
  test('Should initialize error and validateData variables with null', () => {
    const sut = makeSut()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })
  test('Should validate with errors', () => {
    const validateSyncSpy = jest.spyOn(libClassValidator, 'validateSync')
    validateSyncSpy.mockReturnValue([
      {
        property: 'field',
        constraints: { isRequired: 'test error' }
      }
    ])
    const sut = makeSut()
    expect(sut.validate({})).toBeFalsy()
    expect(validateSyncSpy).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })
  test('Should validate without errors', () => {
    const validateSyncSpy = jest.spyOn(libClassValidator, 'validateSync')
    validateSyncSpy.mockReturnValue([])
    const sut = makeSut()
    expect(sut.validate({ field: 'string' })).toBeTruthy()
    expect(validateSyncSpy).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({ field: 'string' })
    expect(sut.errors).toBeNull()
  })
})
