import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { BaseEntity } from './base.entity'
import { Product, User } from '.'

export class Payment extends BaseEntity {
  @prop({ required: true, ref: () => Product })
  declare sender: Ref<Product>

  @prop({ required: true, ref: () => Product })
  declare receptor: Ref<Product>

  @prop({ required: true, ref: () => User })
  declare user: Ref<User>

  @prop({ required: true, ref: () => User })
  declare beneficiary: Ref<User>

  @prop({ required: true, default: 0 })
  declare amount: number
}

export const PaymentModel = getModelForClass(Payment)
