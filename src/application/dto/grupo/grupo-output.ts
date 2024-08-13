import { type GrupoEntity } from '@/domain/entities/grupo.entity'

export type GrupoOutput = {
  id: number | null
  descricao: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  ativo: boolean
}

export const GrupoOutputMapper = (entity: GrupoEntity): GrupoOutput => (entity.toJSON())
