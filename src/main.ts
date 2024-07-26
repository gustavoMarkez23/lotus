import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap (): Promise<void> {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
    await app.listen(3000)
  } catch (error) {
    console.log(error)
  }
}
void bootstrap()
