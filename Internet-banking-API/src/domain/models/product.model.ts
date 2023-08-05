import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { AccountType } from '../../utils'
import { BaseEntity } from './base.entity'
import { User } from './user.model'

export class Product extends BaseEntity {
  @prop({ required: true, unique: true })
  declare pin: string

  @prop({ required: true })
  declare cvv: string

  @prop({ required: true })
  declare expirationDate: string

  @prop({ required: true, unique: true })
  declare cardNumber: string

  @prop({ required: true })
  declare cardHolder: string

  @prop({ default: 0 })
  declare balance: number

  @prop({ default: false })
  declare principal: boolean

  @prop({ default: 0 })
  declare limit: number

  @prop({ default: true })
  declare active: boolean

  @prop({ enum: AccountType, default: AccountType.DEBIT })
  declare type: AccountType

  @prop({ required: true, ref: () => User })
  declare user: Ref<User>

  withPin (pin: string): this {
    this.pin = pin
    return this
  }

  withCvv (cvv: string): this {
    this.cvv = cvv
    return this
  }

  withExpirationDate (expirationDate: string): this {
    this.expirationDate = expirationDate
    return this
  }

  withCardNumber (cardNumber: string): this {
    this.cardNumber = cardNumber
    return this
  }

  withCardHolder (cardHolder: string): this {
    this.cardHolder = cardHolder
    return this
  }

  withBalance (balance: number): this {
    this.balance = balance
    return this
  }

  isPrincipal (principal: boolean): this {
    this.principal = principal
    return this
  }

  withLimit (limit: number): this {
    this.limit = limit
    return this
  }

  isActive (active: boolean): this {
    this.active = active
    return this
  }

  withType (type: AccountType): this {
    this.type = type
    return this
  }

  withUser (user: Ref<User>): this {
    this.user = user
    return this
  }
}

export const ProductModel = getModelForClass(Product)
