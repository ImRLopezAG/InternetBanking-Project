import { getModelForClass, prop } from '@typegoose/typegoose'
import { BaseEntity } from './base.entity'

export class Product extends BaseEntity {
  @prop({ required: true })
  declare pin: string

  @prop({ required: true })
  declare cvv: string

  @prop({ required: true })
  declare expirationDate: string

  @prop({ required: true })
  declare cardNumber: string

  @prop({ required: true })
  declare cardHolder: string

  @prop({ required: true })
  declare userId: string

  @prop({ default: 0 })
  declare balance: number
}

export const ProductModel = getModelForClass(Product)
