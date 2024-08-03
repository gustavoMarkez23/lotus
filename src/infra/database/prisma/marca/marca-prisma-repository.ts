import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type PrismaService } from '@/infra/database/prisma/prisma.service'
import { type MarcaEntity } from '@/domain/entities/marca.entity'
import { type InputCreateMarca } from '@/application/use-cases/marca/create-marca'
import { marcaModelMapper } from './marca-model-mapper'

export class MarcaPrismaRepository implements CreateMarcaRepository {
  constructor (private readonly prismaService: PrismaService) {}
  async create (data: InputCreateMarca): Promise<MarcaEntity> {
    const marcaModel = await this.prismaService.marca.create({ data })
    return marcaModelMapper(marcaModel)
  }
}
