import { type MarcaEntity } from '@/domain/entities/marca.entity'

export interface GetMarcaRepository {
  findById(id: number): Promise<MarcaEntity>
}
