import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type PrismaService } from '@/infra/database/prisma/prisma.service'
import { type MarcaEntity } from '@/domain/entities/marca.entity'
import { type InputCreateMarca } from '@/application/use-cases/marca/create-marca'
import { marcaModelMapper } from './marca-model-mapper'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { type InputGetMarca } from '@/application/use-cases/marca/get-marca'
import { NotFoundError } from '@/domain/errors/not-found-error'

export class MarcaPrismaRepository implements CreateMarcaRepository, GetMarcaRepository {
  constructor (private readonly prismaService: PrismaService) {}
  async create (data: InputCreateMarca): Promise<MarcaEntity> {
    const marcaModel = await this.prismaService.marca.create({ data })
    return marcaModelMapper(marcaModel)
  }

  async get (data: InputGetMarca): Promise<MarcaEntity> {
    try {
      const marcaModel = await this.prismaService.marca.findUniqueOrThrow({ where: data })
      return marcaModelMapper(marcaModel)
    } catch (error) {
      throw new NotFoundError(`MarcaModel not found using ID ${data.id}`)
    }
  }
}
