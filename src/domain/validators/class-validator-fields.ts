import { validateSync } from 'class-validator'
import { type FieldsErrors, type ValidatorFieldsInterface } from './validator-fields.interface'

export abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors | null = null
  validatedData: PropsValidated | null = null
  validate (data: object): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      for (const error of errors) {
        const field = error.property
        errors[field] = Object.values(error.constraints ?? {})
      }
    } else this.validatedData = data as PropsValidated
    return errors.length > 0
  }
}
