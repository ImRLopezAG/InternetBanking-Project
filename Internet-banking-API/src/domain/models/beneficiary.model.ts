import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { BaseEntity } from './base.entity'
import { User } from './user.model'

export class Beneficiary extends BaseEntity {
  @prop({ required: true, ref: () => User })
  declare sender: Ref<User>

  @prop({ required: true, ref: () => User })
  declare receptor: Ref<User>

  withSender (sender: Ref<User>): this {
    this.sender = sender
    return this
  }

  withReceptor (receptor: Ref<User>): this {
    this.receptor = receptor
    return this
  }
}

export const BeneficiaryModel = getModelForClass(Beneficiary)
