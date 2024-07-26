import { type DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, type ConfigModuleOptions } from '@nestjs/config'
import { join } from 'path'

@Module({})
export class EnvConfigModule extends ConfigModule {
  static forRoot (options?: ConfigModuleOptions): DynamicModule {
    return super.forRoot({
      ...options,
      envFilePath: [join(__dirname, `../../../../.env${process.env.NODE_ENV}`)]
    })
  }
}
