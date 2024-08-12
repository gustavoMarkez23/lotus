import { CreateMarca } from '@/application/usecases/marca/create-marca'
import { Body, Controller, Get, HttpCode, Inject, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { CreateMarcaDto } from './dto/create-marca.dto'
import { type MarcaOutput } from '@/application/dto/marca/marca-output'
import { GetMarca } from '@/application/usecases/marca/get-marca'
import { ListMarca, type OutputListMarca } from '@/application/usecases/marca/list-marca'
import { ListMarcaDto } from './dto/list-marca.dto'
import { UpdateMarcaDto } from './dto/update-marca.dto'
import { UpdateMarcaUsecase } from '@/application/usecases/marca/update-marca'
import { ActivateMarcaUsecase } from '@/application/usecases/marca/activate-marca'
import { InactiveMarcaUsecase } from '@/application/usecases/marca/inactive-marca'
import { MarcaCollectionPresenter, MarcaPresenter } from '@/presentation/presenter/marca-presenter'
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

@ApiTags('marcas')
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

  @Inject(ActivateMarcaUsecase)
  private readonly activateMarcaUsecase!: ActivateMarcaUsecase

  @Inject(InactiveMarcaUsecase)
  private readonly inactiveMarcaUsecase!: InactiveMarcaUsecase

  static marcaToResponse (output: MarcaOutput): MarcaPresenter {
    return new MarcaPresenter(output)
  }

  static listMarcaToResponse (output: OutputListMarca): MarcaCollectionPresenter {
    return new MarcaCollectionPresenter(output)
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos'
  })
  @HttpCode(201)
  @Post()
  async create (@Body() createMarcaDto: CreateMarcaDto): Promise<MarcaPresenter> {
    const output = await this.createMarca.execute(createMarcaDto)
    return MarcaController.marcaToResponse(output)
  }

  @ApiResponse({
    status: 404,
    description: 'Id não encontrado'
  })
  @Get(':id')
  async findOne (@Param('id') id: string): Promise<MarcaPresenter> {
    const output = await this.getMarca.execute({ id: +id })
    return MarcaController.marcaToResponse(output)
  }

  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meta: {
          type: 'object',
          properties: {
            total: {
              type: 'number'
            },
            currentPage: {
              type: 'number'
            },
            lastPage: {
              type: 'number'
            },
            perPage: {
              type: 'number'
            }
          }
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(MarcaPresenter) }
        }
      }
    }
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros de consulta inválidos'
  })
  @Get()
  async search (@Query() searchParams: ListMarcaDto): Promise<MarcaCollectionPresenter> {
    const output = await this.listMarca.execute(searchParams)
    return MarcaController.listMarcaToResponse(output)
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos'
  })
  @ApiResponse({
    status: 404,
    description: 'Id não encontrado'
  })
  @Put(':id')
  async update (@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto): Promise<MarcaPresenter> {
    const output = await this.updateMarca.execute({
      id: +id,
      ...updateMarcaDto
    })
    return MarcaController.marcaToResponse(output)
  }

  @ApiResponse({
    status: 404,
    description: 'Id não encontrado'
  })
  @Patch(':id/active')
  async active (@Param('id') id: string): Promise<MarcaPresenter> {
    const output = await this.activateMarcaUsecase.execute({ id: +id })
    return MarcaController.marcaToResponse(output)
  }

  @ApiResponse({
    status: 404,
    description: 'Id não encontrado'
  })
  @Patch(':id/inactive')
  async inactive (@Param('id') id: string): Promise<MarcaPresenter> {
    const output = await this.inactiveMarcaUsecase.execute({ id: +id })
    return MarcaController.marcaToResponse(output)
  }
}
