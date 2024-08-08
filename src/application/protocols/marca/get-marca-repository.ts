import { type InputGetMarca } from '@/application/usecases/marca/get-marca'
import { type MarcaEntity } from '@/domain/entities/marca.entity'

export interface GetMarcaRepository {
  get(data: InputGetMarca): Promise<MarcaEntity>
}
