import { faker } from '@faker-js/faker'
import { type MarcaProps } from 'src/domain/entities/marca.entity'

export const mockMarcaProps = (props: Partial<MarcaProps>): MarcaProps => ({
  descricao: props.descricao ?? faker.person.firstName(),
  createdAt: props.createdAt ?? faker.date.anytime(),
  updatedAt: props.updatedAt ?? faker.date.anytime(),
  deletedAt: props.deletedAt ?? null,
  ativo: props.ativo ?? true
})
