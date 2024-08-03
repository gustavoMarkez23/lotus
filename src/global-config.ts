import { type INestApplication, ValidationPipe } from '@nestjs/common'

export const applyGlobalConfig = (app: INestApplication): void => {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
}
