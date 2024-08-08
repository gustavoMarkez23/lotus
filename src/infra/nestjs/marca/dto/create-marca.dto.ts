import { type InputCreateMarca } from '@/application/usecases/marca/create-marca'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMarcaDto implements InputCreateMarca {
  @IsString()
  @IsNotEmpty()
    descricao: string = ''
}
