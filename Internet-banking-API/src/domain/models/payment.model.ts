import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { BaseEntity } from './base.entity'
import { TransactionType } from '../../utils'
import { User } from './user.model'

export class Payment extends BaseEntity {
  @prop({ required: true })
  declare sender: string

  @prop({ required: true })
  declare receptor: string

  @prop({ required: true, ref: () => User })
  declare owner: Ref<User>

  @prop({ required: true, ref: () => User })
  declare receptorUser: Ref<User>

  @prop({ required: true, default: 0 })
  declare amount: number

  @prop({ enum: TransactionType, default: TransactionType.TRANSFER })
  declare type: TransactionType

  setSender (sender: string): this {
    this.sender = sender
    return this
  }

  setReceptor (receptor: string): this {
    this.receptor = receptor
    return this
  }

  setAmount (amount: number): this {
    this.amount = amount
    return this
  }

  setType (type: TransactionType): this {
    this.type = type
    return this
  }

  setOwner (owner: Ref<User>): this {
    this.owner = owner
    return this
  }

  setReceptorUser (receptorUser: Ref<User>): this {
    this.receptorUser = receptorUser
    return this
  }
}

export const PaymentModel = getModelForClass(Payment)
