import { type InputUpdateMarca } from '@/application/usecases/marca/update-marca'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateMarcaDto implements Omit<InputUpdateMarca, 'id'> {
  @IsString()
  @IsNotEmpty()
    descricao: string = ''
}
