import { Module } from '@nestjs/common'
import { EnvConfigModule } from '@/infra/config/env-config/env-config.module'
import { MarcaModule } from '@/presentation/modules/marca.module'
import { DatabaseModule } from '@/presentation/modules/database.module'
import { GrupoModule } from '@/presentation/modules/grupo.module'
import { PrismaService } from '@/presentation/services/prisma.service'

@Module({
  imports: [EnvConfigModule, MarcaModule, GrupoModule, DatabaseModule],
  providers: [PrismaService]
})
export class AppModule {}
