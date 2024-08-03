import { CreateMarca } from '@/application/use-cases/marca/create-marca'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { CreateMarcaDto } from './dto/create-marca.dto'
import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { MarcaPresenter } from '@/infra/nestjs/presenter/marca-presenter'

@Controller('marcas')
export class MarcaController {
  @Inject(CreateMarca)
  private readonly createMarca!: CreateMarca

  static marcaToResponse (output: MarcaOutput): MarcaPresenter {
    return new MarcaPresenter(output)
  }

  @Post()
  async create (@Body() createMarcaDto: CreateMarcaDto): Promise<MarcaPresenter> {
    const output = await this.createMarca.execute(createMarcaDto)
    return MarcaController.marcaToResponse(output)
  }

  // @Get()
  // findAll () {
  //   return this.marcaService.findAll()
  // }

  // @Get(':id')
  // findOne (@Param('id') id: string) {
  //   return this.marcaService.findOne(+id)
  // }

  // @Patch(':id')
  // update (@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
  //   return this.marcaService.update(+id, updateMarcaDto)
  // }

  // @Delete(':id')
  // remove (@Param('id') id: string) {
  //   return this.marcaService.remove(+id)
  // }
}
