import * as request from 'supertest'
import { Controller, Get, type INestApplication } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { NotFoundErrorFilter } from '@/presentation/exception-filters/not-found-error/not-found-error.filter'

@Controller('stub')
class StubController {
  @Get()
  index (): void {
    throw new NotFoundError('StubModel not found')
  }
}

describe('NotFoundErrorFilter (e2e)', () => {
  let app: INestApplication
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StubController]
    }).compile()
    app = module.createNestApplication()
    app.useGlobalFilters(new NotFoundErrorFilter())
    await app.init()
  })

  it('should be defined', () => {
    expect(new NotFoundErrorFilter()).toBeDefined()
  })

  it('should catch a NotFoundError', () => {
    return request(app.getHttpServer()).get('/stub').expect(404).expect({
      statusCode: 404,
      error: 'NotFound',
      message: 'StubModel not found'
    })
  })
})
