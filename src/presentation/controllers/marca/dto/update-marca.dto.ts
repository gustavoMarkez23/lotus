import { type InputUpdateMarca } from '@/application/usecases/marca/update-marca'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateMarcaDto implements Omit<InputUpdateMarca, 'id'> {
  @ApiProperty({
    description: 'Descrição da marca'
  })
  @IsString()
  @IsNotEmpty()
    descricao: string = ''
}
