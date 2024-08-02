import { Module } from '@nestjs/common'
import { EnvConfigModule } from '@/infra/config/env-config/env-config.module'
import { MarcaModule } from './marca/marca.module'
import { DatabaseModule } from '@/infra/database/database.module'

@Module({
  imports: [EnvConfigModule, MarcaModule, DatabaseModule]
})
export class AppModule {}
