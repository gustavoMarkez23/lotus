import { type InputUpdateGrupo } from '@/application/usecases/grupo/update-grupo-usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateGrupoDto implements Omit<InputUpdateGrupo, 'id'> {
  @ApiProperty({
    description: 'Descrição da grupo'
  })
  @IsString()
  @IsNotEmpty()
    descricao: string = ''
}
