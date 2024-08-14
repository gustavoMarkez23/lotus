import { Module } from '@nestjs/common'
import { GrupoController } from '@/presentation/controllers/grupo/grupo.controller'
import { PrismaService } from '@/presentation/services/prisma.service'
import { GrupoPrismaRepository } from '@/infra/database/prisma/grupo/grupo-prisma-repository'
import { type CreateGrupoRepository } from '@/application/protocols/grupo/create-grupo-repository'
import { CreateGrupoUsecase } from '@/application/usecases/grupo/create-grupo-usecase'
import { GetGrupoUsecase } from '@/application/usecases/grupo/get-grupo-usecase'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { ListGrupoUsecase } from '@/application/usecases/grupo/list-grupo-usecase'
import { type SearchGrupoRepository } from '@/application/protocols/grupo/search-grupo-repository'
import { UpdateGrupoUsecase } from '@/application/usecases/grupo/update-grupo-usecase'
import { type UpdateGrupoRepository } from '@/application/protocols/grupo/update-grupo-repository'
import { ActivateGrupoUsecase } from '@/application/usecases/grupo/activate-grupo-usecase'
import { InactiveGrupoUsecase } from '@/application/usecases/grupo/inactive-grupo-usecase'

@Module({
  controllers: [GrupoController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService
    },
    {
      provide: 'CreateGrupoRepository',
      useFactory: (prismaService: PrismaService) => new GrupoPrismaRepository(prismaService),
      inject: ['PrismaService']
    },
    {
      provide: 'GetGrupoRepository',
      useFactory: (prismaService: PrismaService) => new GrupoPrismaRepository(prismaService),
      inject: ['PrismaService']
    },
    {
      provide: 'SearchGrupoRepository',
      useFactory: (prismaService: PrismaService) => new GrupoPrismaRepository(prismaService),
      inject: ['PrismaService']
    },
    {
      provide: 'UpdateGrupoRepository',
      useFactory: (PrismaService: PrismaService) => new GrupoPrismaRepository(PrismaService),
      inject: ['PrismaService']
    },
    {
      provide: CreateGrupoUsecase,
      useFactory: (createGrupoRepository: CreateGrupoRepository) => new CreateGrupoUsecase(createGrupoRepository),
      inject: ['CreateGrupoRepository']
    },
    {
      provide: GetGrupoUsecase,
      useFactory: (getGrupoRepository: GetGrupoRepository) => new GetGrupoUsecase(getGrupoRepository),
      inject: ['GetGrupoRepository']
    },
    {
      provide: ListGrupoUsecase,
      useFactory: (searchGrupoRepository: SearchGrupoRepository) => new ListGrupoUsecase(searchGrupoRepository),
      inject: ['SearchGrupoRepository']
    },
    {
      provide: UpdateGrupoUsecase,
      useFactory: (getGrupoRepository: GetGrupoRepository, updateGrupoRepository: UpdateGrupoRepository) => new UpdateGrupoUsecase(getGrupoRepository, updateGrupoRepository),
      inject: ['GetGrupoRepository', 'UpdateGrupoRepository']
    },
    {
      provide: ActivateGrupoUsecase,
      useFactory: (getGrupoRepository: GetGrupoRepository, updateGrupoRepository: UpdateGrupoRepository) => new ActivateGrupoUsecase(getGrupoRepository, updateGrupoRepository),
      inject: ['GetGrupoRepository', 'UpdateGrupoRepository']
    },
    {
      provide: InactiveGrupoUsecase,
      useFactory: (getGrupoRepository: GetGrupoRepository, updateGrupoRepository: UpdateGrupoRepository) => new InactiveGrupoUsecase(getGrupoRepository, updateGrupoRepository),
      inject: ['GetGrupoRepository', 'UpdateGrupoRepository']
    }
  ]
})
export class GrupoModule {}
