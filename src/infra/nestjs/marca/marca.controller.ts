import { CreateMarca } from '@/application/use-cases/marca/create-marca'
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { CreateMarcaDto } from './dto/create-marca.dto'
import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { MarcaPresenter } from '@/infra/nestjs/presenter/marca-presenter'
import { GetMarca } from '@/application/use-cases/marca/get-marca'

@Controller('marcas')
export class MarcaController {
  @Inject(CreateMarca)
  private readonly createMarca!: CreateMarca

  @Inject(GetMarca)
  private readonly getMarca!: GetMarca

  static marcaToResponse (output: MarcaOutput): MarcaPresenter {
    return new MarcaPresenter(output)
  }

  @Post()
  async create (@Body() createMarcaDto: CreateMarcaDto): Promise<MarcaPresenter> {
    const output = await this.createMarca.execute(createMarcaDto)
    return MarcaController.marcaToResponse(output)
  }

  @Get(':id')
  async findOne (@Param('id') id: string): Promise<MarcaPresenter> {
    const output = await this.getMarca.execute({ id: +id })
    return MarcaController.marcaToResponse(output)
  }

  // @Get()
  // findAll () {
  //   return this.marcaService.findAll()
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
