import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify'
import { EnvConfigService } from './infra/config/env-config/env-config.service'
import { applyGlobalConfig } from './global-config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { type INestApplication } from '@nestjs/common'

async function bootstrap (): Promise<void> {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
    applySwaggerConfig(app)
    const envConfigService = app.get(EnvConfigService)
    applyGlobalConfig(app)
    await app.listen(envConfigService.getAppPort())
  } catch (error) {
    console.log(error)
  }
}
const applySwaggerConfig = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Lotus')
    .setDescription('Documentação API - Lotus')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}
void bootstrap()
