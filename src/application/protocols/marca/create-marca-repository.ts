import { type InputCreateMarca } from '@/application/usecases/marca/create-marca'
import { type MarcaEntity } from '@/domain/entities/marca.entity'

export interface CreateMarcaRepository {
  create(data: InputCreateMarca): Promise<MarcaEntity>
}
