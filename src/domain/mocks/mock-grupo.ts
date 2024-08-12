import { faker } from '@faker-js/faker'
import { type GrupoProps } from '@/domain/entities/grupo.entity'

export const mockGrupoProps = (props: Partial<GrupoProps>): GrupoProps => ({
  descricao: props.descricao ?? faker.person.firstName(),
  createdAt: props.createdAt ?? faker.date.anytime(),
  updatedAt: props.updatedAt ?? faker.date.anytime(),
  deletedAt: props.deletedAt ?? null,
  ativo: props.ativo ?? true
})
