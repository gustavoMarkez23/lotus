export abstract class Entity<Props = any> {
  public readonly _id?: number
  constructor (protected readonly props: Props, id?: number) {
    this._id = id
  }

  get id (): number | null {
    return this._id ?? null
  }

  toJSON (): Required<{ id: number } & Props> {
    const json = Object.assign({ id: this._id }, this.props) as Required<{ id: number } & Props>
    return json
  }
}
