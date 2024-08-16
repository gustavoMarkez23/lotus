import { ClassSerializerInterceptor, type INestApplication, ValidationPipe } from '@nestjs/common'
import { NotFoundErrorFilter } from './presentation/exception-filters/not-found-error/not-found-error.filter'
import { WrapperDataInterceptor } from './presentation/interceptors/wrapper-data.interceptor'
import { Reflector } from '@nestjs/core'

export const applyGlobalConfig = (app: INestApplication): void => {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector))
  )
  app.useGlobalFilters(
    new NotFoundErrorFilter()
  )
}
