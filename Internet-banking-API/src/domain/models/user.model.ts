import { getModelForClass, pre, prop } from '@typegoose/typegoose'
import bcrypt from 'bcrypt'
import { UserRole } from '../../utils/constants/enums'
import { BaseEntity } from './base.entity'

@pre<User>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})
@pre<User>('findOneAndUpdate', async function (next) {
  const update: any = this.getUpdate()
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10)
  }
  next()
})
export class User extends BaseEntity {
  @prop({ required: true })
  declare firstName: string

  @prop({ required: true })
  declare lastName: string

  @prop({ required: true, unique: true, lowercase: true })
  declare email: string

  @prop({ required: true, unique: true, lowercase: true })
  declare username: string

  @prop({ required: true })
  declare password: string

  @prop({ enum: UserRole, default: UserRole.Client })
  declare role: UserRole

  withFirstName (firstName: string): this {
    this.firstName = firstName
    return this
  }

  withLastName (lastName: string): this {
    this.lastName = lastName
    return this
  }

  withEmail (email: string): this {
    this.email = email
    return this
  }

  withUsername (username: string): this {
    this.username = username
    return this
  }

  withPassword (password: string): this {
    this.password = password
    return this
  }

  withRole (role: UserRole): this {
    this.role = role
    return this
  }

  async comparePassword (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}

export const UserModel = getModelForClass(User)
