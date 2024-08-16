import { type InputCreateGrupo } from '@/application/usecases/grupo/create-grupo-usecase'
import { type GrupoEntity } from '@/domain/entities/grupo.entity'

export interface CreateGrupoRepository {
  create(data: InputCreateGrupo): Promise<GrupoEntity>
}
