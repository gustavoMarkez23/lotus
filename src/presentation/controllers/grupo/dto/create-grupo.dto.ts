import { type InputCreateGrupo } from '@/application/usecases/grupo/create-grupo-usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateGrupoDto implements InputCreateGrupo {
  @ApiProperty({
    description: 'Descrição da grupo'
  })
  @IsString()
  @IsNotEmpty()
    descricao: string = ''
}
