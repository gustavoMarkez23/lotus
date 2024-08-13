import { GrupoEntity } from '@/domain/entities/grupo.entity'
import { type CreateGrupoRepository } from '@/application/protocols/grupo/create-grupo-repository'
import { type InputCreateGrupo } from '@/application//usecases/grupo/create-grupo-usecase'
import { faker } from '@faker-js/faker'
import { type GetGrupoRepository } from '@/application/protocols/grupo/get-grupo-repository'
import { mockGrupoProps } from '@/domain/mocks/mock-grupo'
import { type UpdateGrupoRepository } from '@/application/protocols/grupo/update-grupo-repository'

export const mockCreateGrupoRepository = (): CreateGrupoRepository => {
  class CreateGrupoRepositoryStub implements CreateGrupoRepository {
    async create (data: InputCreateGrupo): Promise<GrupoEntity> {
      return await Promise.resolve(new GrupoEntity(data, faker.number.int()))
    }
  }
  return new CreateGrupoRepositoryStub()
}
export const mockGetGrupoRepository = (): GetGrupoRepository => {
  class GetGrupoRepositoryStub implements GetGrupoRepository {
    async findById (id: number): Promise<GrupoEntity> {
      return await Promise.resolve(new GrupoEntity(mockGrupoProps({}), id))
    }
  }
  return new GetGrupoRepositoryStub()
}
export const mockUpdateGrupoRepository = (): UpdateGrupoRepository => {
  class UpdateGrupoRepositoryStub implements UpdateGrupoRepository {
    async update (data: GrupoEntity): Promise<void> {}
  }
  return new UpdateGrupoRepositoryStub()
}
