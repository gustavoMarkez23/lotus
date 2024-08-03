import { type InputCreateMarca } from '@/application/use-cases/marca/create-marca'
import { type MarcaEntity } from '@/domain/entities/marca.entity'

export interface CreateMarcaRepository {
  create(data: InputCreateMarca): Promise<MarcaEntity>
}
