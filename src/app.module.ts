import { Module } from '@nestjs/common'
import { EnvConfigModule } from '@/infra/config/env-config/env-config.module'
import { MarcaModule } from './presentation/modules/marca.module'
import { DatabaseModule } from './presentation/modules/database.module'

@Module({
  imports: [EnvConfigModule, MarcaModule, DatabaseModule]
})
export class AppModule {}
