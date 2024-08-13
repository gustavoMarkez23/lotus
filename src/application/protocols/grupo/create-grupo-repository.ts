import { type InputCreateGrupo } from '@/application/usecases/grupo/create-grupo'
import { type GrupoEntity } from '@/domain/entities/grupo.entity'

export interface CreateGrupoRepository {
  create(data: InputCreateGrupo): Promise<GrupoEntity>
}
