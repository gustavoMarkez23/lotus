import { Module } from '@nestjs/common'
import { MarcaPrismaRepository } from '@/infra/database/prisma/marca/marca-prisma-repository'
import { type CreateMarcaRepository } from '@/application/protocols/marca/create-marca-repository'
import { type GetMarcaRepository } from '@/application/protocols/marca/get-marca-repository'
import { type SearchMarcaRepository } from '@/application/protocols/marca/search-marca-repository'
import { type UpdateMarcaRepository } from '@/application/protocols/marca/update-marca-repository'
import { CreateMarca } from '@/application/usecases/marca/create-marca'
import { GetMarca } from '@/application/usecases/marca/get-marca'
import { ListMarca } from '@/application/usecases/marca/list-marca'
import { UpdateMarcaUsecase } from '@/application/usecases/marca/update-marca'
import { ActivateMarcaUsecase } from '@/application/usecases/marca/activate-marca'
import { InactiveMarcaUsecase } from '@/application/usecases/marca/inactive-marca'
import { PrismaService } from '@/presentation/services/prisma.service'
import { MarcaController } from '@/presentation/controllers/marca/marca.controller'

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
      provide: 'SearchMarcaRepository',
      useFactory: (prismaService: PrismaService) => new MarcaPrismaRepository(prismaService),
      inject: ['PrismaService']
    },
    {
      provide: 'UpdateMarcaRepository',
      useFactory: (PrismaService: PrismaService) => new MarcaPrismaRepository(PrismaService),
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
    },
    {
      provide: ListMarca,
      useFactory: (searchMarcaRepository: SearchMarcaRepository) => new ListMarca(searchMarcaRepository),
      inject: ['SearchMarcaRepository']
    },
    {
      provide: UpdateMarcaUsecase,
      useFactory: (getMarcaRepository: GetMarcaRepository, updateMarcaRepository: UpdateMarcaRepository) => new UpdateMarcaUsecase(getMarcaRepository, updateMarcaRepository),
      inject: ['GetMarcaRepository', 'UpdateMarcaRepository']
    },
    {
      provide: ActivateMarcaUsecase,
      useFactory: (getMarcaRepository: GetMarcaRepository, updateMarcaRepository: UpdateMarcaRepository) => new ActivateMarcaUsecase(getMarcaRepository, updateMarcaRepository),
      inject: ['GetMarcaRepository', 'UpdateMarcaRepository']
    },
    {
      provide: InactiveMarcaUsecase,
      useFactory: (getMarcaRepository: GetMarcaRepository, updateMarcaRepository: UpdateMarcaRepository) => new InactiveMarcaUsecase(getMarcaRepository, updateMarcaRepository),
      inject: ['GetMarcaRepository', 'UpdateMarcaRepository']
    }
  ]
})
export class MarcaModule {}
