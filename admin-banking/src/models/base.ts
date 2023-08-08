export class BaseModel {
  declare id: string
  declare createdAt: Date

  setId (id: string): void {
    this.id = id
  }

  setCreatedAt (createdAt: Date): void {
    this.createdAt = createdAt
  }
}
