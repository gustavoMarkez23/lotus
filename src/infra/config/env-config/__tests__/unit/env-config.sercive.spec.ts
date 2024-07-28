import { Test, type TestingModule } from '@nestjs/testing'
import { EnvConfigModule } from '../../env-config.module'
import { EnvConfigService } from '../../env-config.service'
describe('EnvConfigService', () => {
  let sut: EnvConfigService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService]
    }).compile()

    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  test('Should be defined', () => {
    expect(sut).toBeDefined()
  })
  test('should return the variable PORT', () => {
    expect(sut.getAppPort()).toBe(3000)
  })
  test('should return the variable PORT', () => {
    expect(sut.getNodeEnv()).toBe('test')
  })
})