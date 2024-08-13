import { GrupoEntity } from '@/domain/entities/grupo.entity'
import { ValidationError } from '@/domain/errors/validation-error'
import { type Grupo } from '@prisma/client'

export const grupoModelMapper = (model: Grupo): GrupoEntity => {
  try {
    const { id, ...data } = model
    return new GrupoEntity(data, id)
  } catch (error) {
    throw new ValidationError('An entity not be loaded')
  }
}
