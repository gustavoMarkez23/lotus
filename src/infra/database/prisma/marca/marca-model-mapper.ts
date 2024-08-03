import { MarcaEntity } from '@/domain/entities/marca.entity'
import { ValidationError } from '@/domain/errors/validation-error'
import { type Marca } from '@prisma/client'

export const marcaModelMapper = (model: Marca): MarcaEntity => {
  try {
    const { id, ...data } = model
    return new MarcaEntity(data, id)
  } catch (error) {
    throw new ValidationError('An entity not be loaded')
  }
}
