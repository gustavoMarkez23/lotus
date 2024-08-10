import { type MarcaEntity } from '@/domain/entities/marca.entity'

export interface UpdateMarcaRepository {
  update(data: MarcaEntity): Promise<void>
}
