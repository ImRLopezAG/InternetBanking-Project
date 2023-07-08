import { getModelForClass, prop } from '@typegoose/typegoose'
import { BaseEntity } from './base.entity'

export class Payment extends BaseEntity {
  @prop({ required: true })
  declare sender: string

  @prop({ required: true })
  declare receptor: string

  @prop({ required: true, default: 0 })
  declare amount: number
}

export const PaymentModel = getModelForClass(Payment)
