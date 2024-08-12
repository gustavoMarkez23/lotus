import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type MarcaEntity } from '@/domain/entities/marca.entity'
import { type InputCreateMarca } from '@/application/usecases/marca/create-marca'
import { marcaModelMapper } from './marca-model-mapper'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { type SearchMarcaParams, type SearchMarcaRepository, SearchMarcaResult } from '@/application/protocols/marca/search-marca-repository'
import { type SearchResult } from '@/application/protocols/shared/searchable-repository'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { type Marca } from '@prisma/client'
import { type PrismaService } from '@/presentation/services/prisma.service'

export class MarcaPrismaRepository implements CreateMarcaRepository, GetMarcaRepository, SearchMarcaRepository, UpdateMarcaRepository {
  constructor (private readonly prismaService: PrismaService) {}
  filtableFields: string[] = ['descricao']
  sortableFields: string[] = ['descricao', 'createdAt']
  async create (data: InputCreateMarca): Promise<MarcaEntity> {
    const marcaModel = await this.prismaService.marca.create({ data })
    return marcaModelMapper(marcaModel)
  }

  async findById (id: number): Promise<MarcaEntity> {
    try {
      const marcaModel = await this._get(id)
      return marcaModelMapper(marcaModel)
    } catch (error) {
      throw new NotFoundError(`MarcaModel not found using ID ${id}`)
    }
  }

  async update (data: MarcaEntity): Promise<void> {
    const id = Number(data.id)
    await this._get(id)
    await this.prismaService.marca.update({
      where: { id },
      data: data.toJSON()
    })
  }

  private async _get (id: number): Promise<Marca> {
    try {
      return await this.prismaService.marca.findUniqueOrThrow({ where: { id } })
    } catch (error) {
      throw new NotFoundError(`MarcaModel not found using ID ${id}`)
    }
  }

  async search (props: SearchMarcaParams): Promise<SearchResult<MarcaEntity, string>> {
    const { page, perPage, sort, sortDir } = props
    const filtable = this.filtableFields?.includes(String(props.filterField)) || false
    const filter = filtable ? String(props.filter) : null
    const filterField = filtable ? String(props.filterField) : null

    const sortable = this.sortableFields?.includes(String(sort)) || false
    const orderByField = sortable ? sort : 'createdAt'
    const orderByDir = sortable ? sortDir : 'desc'

    const take = props.perPage && props.perPage > 0 ? props.perPage : 15
    const skip = props.page && props.page > 0 ? (props.page - 1) * take : 1

    const count = await this.prismaService.marca.count({
      ...(filter && {
        where: {
          [String(filterField)]: {
            contains: filter
          }
        }
      })
    })
    const models = await this.prismaService.marca.findMany({
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

    return new SearchMarcaResult({
      items: models.map(o => marcaModelMapper(o)),
      total: count,
      currentPage: page,
      filter,
      perPage,
      sort,
      sortDir
    })
  }
}
