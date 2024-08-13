import { type PrismaService } from '@/presentation/services/prisma.service'
import { type CreateGrupoRepository } from '@/application/protocols/grupo/create-grupo-repository'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { type SearchGrupoParams, type SearchGrupoRepository, SearchGrupoResult } from '@/application/protocols/grupo/search-grupo-repository'
import { type UpdateGrupoRepository } from '@/application/protocols/grupo/update-grupo-repository'
import { type InputCreateGrupo } from '@/application/usecases/grupo/create-grupo-usecase'
import { type GrupoEntity } from '@/domain/entities/grupo.entity'
import { grupoModelMapper } from './grupo-model-mapper'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { type Grupo } from '@prisma/client'
import { type SearchResult } from '@/application/protocols/shared/searchable-repository'

export class GrupoPrismaRepository implements CreateGrupoRepository, GetGrupoRepository, SearchGrupoRepository, UpdateGrupoRepository {
  constructor (private readonly prismaService: PrismaService) {}
  filtableFields: string[] = ['descricao']
  sortableFields: string[] = ['descricao', 'createdAt']

  async create (data: InputCreateGrupo): Promise<GrupoEntity> {
    const grupoModel = await this.prismaService.grupo.create({ data })
    return grupoModelMapper(grupoModel)
  }

  async findById (id: number): Promise<GrupoEntity> {
    try {
      const grupoModel = await this._get(id)
      return grupoModelMapper(grupoModel)
    } catch (error) {
      throw new NotFoundError(`GrupoModel not found using ID ${id}`)
    }
  }

  async update (data: GrupoEntity): Promise<void> {
    const id = Number(data.id)
    await this._get(id)
    await this.prismaService.grupo.update({
      where: { id },
      data: data.toJSON()
    })
  }

  private async _get (id: number): Promise<Grupo> {
    try {
      return await this.prismaService.grupo.findUniqueOrThrow({ where: { id } })
    } catch (error) {
      throw new NotFoundError(`GrupoModel not found using ID ${id}`)
    }
  }

  async search (props: SearchGrupoParams): Promise<SearchResult<GrupoEntity, string>> {
    const { page, perPage, sort, sortDir } = props
    const filtable = this.filtableFields?.includes(String(props.filterField)) || false
    const filter = filtable ? String(props.filter) : null
    const filterField = filtable ? String(props.filterField) : null

    const sortable = this.sortableFields?.includes(String(sort)) || false
    const orderByField = sortable ? sort : 'createdAt'
    const orderByDir = sortable ? sortDir : 'desc'

    const take = props.perPage && props.perPage > 0 ? props.perPage : 15
    const skip = props.page && props.page > 0 ? (props.page - 1) * take : 1

    const count = await this.prismaService.grupo.count({
      ...(filter && {
        where: {
          [String(filterField)]: {
            contains: filter
          }
        }
      })
    })
    const models = await this.prismaService.grupo.findMany({
      ...(filter && {
        where: {
          [String(filterField)]: {
            contains: filter
          }
        }
      }),
      orderBy: { [String(orderByField)]: String(orderByDir) },
      skip,
      take
    })

    return new SearchGrupoResult({
      items: models.map(o => grupoModelMapper(o)),
      total: count,
      currentPage: page,
      filter,
      perPage,
      sort,
      sortDir
    })
  }
}
