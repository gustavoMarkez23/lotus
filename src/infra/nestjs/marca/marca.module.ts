import { Module } from '@nestjs/common'
import { MarcaController } from '@/infra/nestjs/marca/marca.controller'
import { CreateMarca } from '@/application/use-cases/marca/create-marca'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { MarcaPrismaRepository } from '@/infra/database/prisma/marca/marca-prisma-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { GetMarca } from '@/application/use-cases/marca/get-marca'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'

@Module({
  controllers: [MarcaController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService
    },
    {
      provide: 'CreateMarcaRepository',
      useFactory: (prismaService: PrismaService) => new MarcaPrismaRepository(prismaService),
      inject: ['PrismaService']
    },
    {
      provide: 'GetMarcaRepository',
      useFactory: (prismaService: PrismaService) => new MarcaPrismaRepository(prismaService),
      inject: ['PrismaService']
    },
    {
      provide: CreateMarca,
      useFactory: (createMarcaRepository: CreateMarcaRepository) => new CreateMarca(createMarcaRepository),
      inject: ['CreateMarcaRepository']
    },
    {
      provide: GetMarca,
      useFactory: (getMarcaRepository: GetMarcaRepository) => new GetMarca(getMarcaRepository),
      inject: ['GetMarcaRepository']
    }
  ]
})
export class MarcaModule {}
