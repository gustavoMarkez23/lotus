import { Module } from '@nestjs/common'
import { EnvConfigModule } from '@/infra/config/env-config/env-config.module'
import { MarcaModule } from '@/presentation/modules/marca.module'
import { DatabaseModule } from '@/presentation/modules/database.module'
import { GrupoController } from '@/presentation/controllers/grupo/grupo.controller'
import { GrupoModule } from '@/presentation/modules/grupo.module'

@Module({
  imports: [EnvConfigModule, MarcaModule, GrupoModule, DatabaseModule],
  controllers: [GrupoController]
})
export class AppModule {}
