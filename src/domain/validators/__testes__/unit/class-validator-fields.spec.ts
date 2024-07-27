import { ClassValidatorFields } from '../../class-validator-fields'

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {}
const makeSut = (): StubClassValidatorFields => (new StubClassValidatorFields())
describe('ClassValidatorFields', () => {
  test('Should initialize error and validateData variables with null', () => {
    const sut = makeSut()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })
})
