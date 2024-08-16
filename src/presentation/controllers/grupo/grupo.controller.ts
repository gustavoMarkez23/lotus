import { Body, Controller, Get, HttpCode, Inject, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { type GrupoOutput } from '@/application/dto/grupo/grupo-output'
import { ActivateGrupoUsecase } from '@/application/usecases/grupo/activate-grupo-usecase'
import { CreateGrupoUsecase } from '@/application/usecases/grupo/create-grupo-usecase'
import { GetGrupoUsecase } from '@/application/usecases/grupo/get-grupo-usecase'
import { InactiveGrupoUsecase } from '@/application/usecases/grupo/inactive-grupo-usecase'
import { ListGrupoUsecase, type OutputListGrupo } from '@/application/usecases/grupo/list-grupo-usecase'
import { UpdateGrupoUsecase } from '@/application/usecases/grupo/update-grupo-usecase'
import { GrupoCollectionPresenter, GrupoPresenter } from '@/presentation/presenter/grupo-presenter'
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { CreateGrupoDto } from '@/presentation/controllers/grupo/dto/create-grupo.dto'
import { ListGrupoDto } from '@/presentation/controllers/grupo/dto/list-grupo.dto'
import { UpdateGrupoDto } from '@/presentation/controllers/grupo/dto/update-grupo.dto'

@ApiTags('grupos')
@Controller('grupos')
export class GrupoController {
  @Inject(CreateGrupoUsecase)
  private readonly createGrupo!: CreateGrupoUsecase

  @Inject(GetGrupoUsecase)
  private readonly getGrupo!: GetGrupoUsecase

  @Inject(ListGrupoUsecase)
  private readonly listGrupo!: ListGrupoUsecase

  @Inject(UpdateGrupoUsecase)
  private readonly updateGrupo!: UpdateGrupoUsecase

  @Inject(ActivateGrupoUsecase)
  private readonly activateGrupoUsecase!: ActivateGrupoUsecase

  @Inject(InactiveGrupoUsecase)
  private readonly inactiveGrupoUsecase!: InactiveGrupoUsecase

  static grupoToResponse (output: GrupoOutput): GrupoPresenter {
    return new GrupoPresenter(output)
  }

  static listGrupoToResponse (output: OutputListGrupo): GrupoCollectionPresenter {
    return new GrupoCollectionPresenter(output)
  }

  @ApiResponse({
    status: 422,
    description: 'Corpo da requisição com dados inválidos'
  })
  @HttpCode(201)
  @Post()
  async create (@Body() createGrupoDto: CreateGrupoDto): Promise<GrupoPresenter> {
    const output = await this.createGrupo.execute(createGrupoDto)
    return GrupoController.grupoToResponse(output)
  }

  @ApiResponse({
    status: 404,
    description: 'Id não encontrado'
  })
  @Get(':id')
  async findOne (@Param('id') id: string): Promise<GrupoPresenter> {
    const output = await this.getGrupo.execute({ id: +id })
    return GrupoController.grupoToResponse(output)
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
          items: { $ref: getSchemaPath(GrupoPresenter) }
        }
      }
    }
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros de consulta inválidos'
  })
  @Get()
  async search (@Query() searchParams: ListGrupoDto): Promise<GrupoCollectionPresenter> {
    const output = await this.listGrupo.execute(searchParams)
    return GrupoController.listGrupoToResponse(output)
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
  async update (@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto): Promise<GrupoPresenter> {
    const output = await this.updateGrupo.execute({
      id: +id,
      ...updateGrupoDto
    })
    return GrupoController.grupoToResponse(output)
  }

  @ApiResponse({
    status: 404,
    description: 'Id não encontrado'
  })
  @Patch(':id/active')
  async active (@Param('id') id: string): Promise<GrupoPresenter> {
    const output = await this.activateGrupoUsecase.execute({ id: +id })
    return GrupoController.grupoToResponse(output)
  }

  @ApiResponse({
    status: 404,
    description: 'Id não encontrado'
  })
  @Patch(':id/inactive')
  async inactive (@Param('id') id: string): Promise<GrupoPresenter> {
    const output = await this.inactiveGrupoUsecase.execute({ id: +id })
    return GrupoController.grupoToResponse(output)
  }
}
