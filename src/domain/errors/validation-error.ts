import { type FieldsErrors } from '@/domain/validators/validator-fields.interface'

export class EntityValidationError extends Error {
  constructor (public error: FieldsErrors) {
    super('Entity Validation Error')
    this.name = 'EntityValidationError'
  }
}
