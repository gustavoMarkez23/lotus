import { type InputCreateMarca } from '@/application/usecases/marca/create-marca'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMarcaDto implements InputCreateMarca {
  @ApiProperty({
    description: 'Descrição da marca'
  })
  @IsString()
  @IsNotEmpty()
    descricao: string = ''
}
