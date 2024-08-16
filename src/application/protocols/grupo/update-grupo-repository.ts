import { type GrupoEntity } from '@/domain/entities/grupo.entity'

export interface UpdateGrupoRepository {
  update(data: GrupoEntity): Promise<void>
}
