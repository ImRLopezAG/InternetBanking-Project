import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { BaseEntity } from './base.entity'
import { User } from './user.model'

export class Beneficiary extends BaseEntity {
  @prop({ required: true, ref: () => User })
  declare sender: Ref<User>

  @prop({ required: true, ref: () => User })
  declare receptor: Ref<User>
}

export const BeneficiaryModel = getModelForClass(Beneficiary)
