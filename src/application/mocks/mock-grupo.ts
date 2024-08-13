import { GrupoEntity } from '@/domain/entities/grupo.entity'
import { type CreateGrupoRepository } from '@/application/protocols/grupo/create-grupo-repository'
import { type InputCreateGrupo } from '@/application//usecases/grupo/create-grupo-usecase'
import { faker } from '@faker-js/faker'

export const mockCreateGrupoRepository = (): CreateGrupoRepository => {
  class CreateGrupoRepositoryStub implements CreateGrupoRepository {
    async create (data: InputCreateGrupo): Promise<GrupoEntity> {
      return await Promise.resolve(new GrupoEntity(data, faker.number.int()))
    }
  }
  return new CreateGrupoRepositoryStub()
}
