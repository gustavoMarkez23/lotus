import { type INestApplication, ValidationPipe } from '@nestjs/common'
import { NotFoundErrorFilter } from './presentation/exception-filters/not-found-error/not-found-error.filter'

export const applyGlobalConfig = (app: INestApplication): void => {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  app.useGlobalFilters(
    new NotFoundErrorFilter()
  )
}
