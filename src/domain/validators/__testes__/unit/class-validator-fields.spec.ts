import * as libClassValidator from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

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
    const sut = new StubClassValidatorFields()
    expect(sut.validate({})).toBeFalsy()
    expect(validateSyncSpy).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })
})
