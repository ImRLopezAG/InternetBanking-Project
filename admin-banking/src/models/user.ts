import { BaseModel } from './base'

export class UserModel extends BaseModel {
  declare username: string
  declare password: string
  declare firstName: string
  declare lastName: string
  declare email: string
  declare role: UserRole

  constructor () {
    super()
    this.username = ''
    this.password = ''
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.role = UserRole.Client
  }
}

export class UserBuilder {
  private readonly user: UserModel

  constructor () {
    this.user = new UserModel()
  }

  setId (id: string): UserBuilder {
    this.user.setId(id)
    return this
  }

  setCreatedAt (createdAt: Date): UserBuilder {
    this.user.setCreatedAt(createdAt)
    return this
  }

  setFirstName (firstName: string): UserBuilder {
    this.user.firstName = firstName
    return this
  }

  setLastName (lastName: string): UserBuilder {
    this.user.lastName = lastName
    return this
  }

  setUsername (username: string): UserBuilder {
    this.user.username = username
    return this
  }

  setPassword (password: string): UserBuilder {
    this.user.password = password
    return this
  }

  setEmail (email: string): UserBuilder {
    this.user.email = email
    return this
  }

  setRole (role: UserRole): UserBuilder {
    this.user.role = role
    return this
  }

  build (): UserModel {
    return this.user
  }
}

enum UserRole {
  Admin = 1,
  Client
}
