import { type MarcaEntity } from '@/domain/entities/marca.entity'

export type MarcaOutput = {
  id: number | null
  descricao: string
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  ativo: boolean
}

export const MarcaOutputMapper = (entity: MarcaEntity): MarcaOutput => (entity.toJSON())
