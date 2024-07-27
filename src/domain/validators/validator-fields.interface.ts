export type FieldsErrors = Record<string, string[]>

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors | null
  validatedData: PropsValidated | null
  validate(data: object): boolean
}
