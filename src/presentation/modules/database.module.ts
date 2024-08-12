import { type DynamicModule, Module } from '@nestjs/common'
import { EnvConfigModule } from '@/infra/config/env-config/env-config.module'
import { ConfigService } from '@nestjs/config'
import { type PrismaClient } from '@prisma/client'
import { PrismaService } from '@/presentation/services/prisma.service'

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [ConfigService, PrismaService],
  exports: [PrismaService]
})
export class DatabaseModule {
  static forTest (prismaClient: PrismaClient): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PrismaService,
          useFactory: () => prismaClient as PrismaService
        }
      ]
    }
  }
}
