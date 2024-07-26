export abstract class Entity<Props = any> {
  public readonly _id: number
  constructor (public readonly props: Props, id: number) {
    this._id = id
  }

  get id (): number {
    return this._id
  }

  toJSON (): Required<{ id: number } & Props> {
    const json = Object.assign({ id: this._id }, this.props) as Required<{ id: number } & Props>
    return json
  }
}
