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

  withSender (sender: string): this {
    this.sender = sender
    return this
  }

  withReceptor (receptor: string): this {
    this.receptor = receptor
    return this
  }

  withAmount (amount: number): this {
    this.amount = amount
    return this
  }

  withType (type: TransactionType): this {
    this.type = type
    return this
  }
}

export const PaymentModel = getModelForClass(Payment)
