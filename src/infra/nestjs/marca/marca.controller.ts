import { CreateMarca } from '@/application/usecases/marca/create-marca'
import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { CreateMarcaDto } from './dto/create-marca.dto'
import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { MarcaCollectionPresenter, MarcaPresenter } from '@/infra/nestjs/presenter/marca-presenter'
import { GetMarca } from '@/application/usecases/marca/get-marca'
import { ListMarca, type OutputListMarca } from '@/application/usecases/marca/list-marca'
import { ListMarcaDto } from './dto/list-marca.dto'
import { UpdateMarcaDto } from './dto/update-marca.dto'
import { UpdateMarcaUsecase } from '@/application/usecases/marca/update-marca'

@Controller('marcas')
export class MarcaController {
  @Inject(CreateMarca)
  private readonly createMarca!: CreateMarca

  @Inject(GetMarca)
  private readonly getMarca!: GetMarca

  @Inject(ListMarca)
  private readonly listMarca!: ListMarca

  @Inject(UpdateMarcaUsecase)
  private readonly updateMarca!: UpdateMarcaUsecase

  static marcaToResponse (output: MarcaOutput): MarcaPresenter {
    return new MarcaPresenter(output)
  }

  static listMarcaToResponse (output: OutputListMarca): MarcaCollectionPresenter {
    return new MarcaCollectionPresenter(output)
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

  @Get()
  async search (@Query() searchParams: ListMarcaDto): Promise<MarcaCollectionPresenter> {
    const output = await this.listMarca.execute(searchParams)
    return MarcaController.listMarcaToResponse(output)
  }

  @Put(':id')
  async update (@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto): Promise<MarcaPresenter> {
    const output = await this.updateMarca.execute({
      id: +id,
      ...updateMarcaDto
    })
    return MarcaController.marcaToResponse(output)
  }

  // @Delete(':id')
  // remove (@Param('id') id: string) {
  //   return this.marcaService.remove(+id)
  // }
}
