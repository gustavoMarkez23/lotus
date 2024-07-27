import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify'
import { EnvConfigService } from './infra/config/env-config/env-config.service'

async function bootstrap (): Promise<void> {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
    const envConfigService = app.get(EnvConfigService)
    await app.listen(envConfigService.getAppPort())
  } catch (error) {
    console.log(error)
  }
}
void bootstrap()
