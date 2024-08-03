import { type InputGetMarca } from '@/application/use-cases/marca/get-marca'
import { type MarcaEntity } from '@/domain/entities/marca.entity'

export interface GetMarcaRepositiry {
  get(data: InputGetMarca): Promise<MarcaEntity>
}
