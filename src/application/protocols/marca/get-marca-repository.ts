import { type InputGetMarca } from '@/application/use-cases/marca/__tests__/unit/get-marca.spec'
import { type MarcaEntity } from '@/domain/entities/marca.entity'

export interface GetMarcaRepositiry {
  get(data: InputGetMarca): Promise<MarcaEntity>
}
