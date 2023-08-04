import { getModelForClass, prop } from '@typegoose/typegoose'
import { BaseEntity } from './base.entity'
import { TransactionType } from '../../utils'

export class Payment extends BaseEntity {
  @prop({ required: true })
  declare sender: string

  @prop({ required: true })
  declare receptor: string

  @prop({ required: true, default: 0 })
  declare amount: number

  @prop({ enum: TransactionType, default: TransactionType.TRANSFER })
  declare type: TransactionType
}

export const PaymentModel = getModelForClass(Payment)
