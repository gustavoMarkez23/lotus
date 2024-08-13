import { type GrupoEntity } from '@/domain/entities/grupo.entity'

export interface GetGrupoRepository {
  findById(id: number): Promise<GrupoEntity>
}
