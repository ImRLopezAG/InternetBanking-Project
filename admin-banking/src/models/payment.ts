import { BaseModel } from './base'

export class PaymentModel extends BaseModel {
  declare amount: number
  declare sender: string
  declare receptor: string
  declare receptorUser: string
  declare owner: string
  declare type: PaymentType

  constructor () {
    super()
    this.amount = 0
    this.sender = ''
    this.receptor = ''
    this.receptorUser = ''
    this.owner = ''
    this.type = PaymentType.TRANSFER
  }
}

export class PaymentBuilder {
  private readonly payment: PaymentModel

  constructor () {
    this.payment = new PaymentModel()
  }

  setId (id: string): PaymentBuilder {
    this.payment.setId(id)
    return this
  }

  setCreatedAt (createdAt: Date): PaymentBuilder {
    this.payment.setCreatedAt(createdAt)
    return this
  }

  setSender (sender: string): PaymentBuilder {
    this.payment.sender = sender
    return this
  }

  setReceptor (receptor: string): PaymentBuilder {
    this.payment.receptor = receptor
    return this
  }

  setReceptorUser (receptorUser: string): PaymentBuilder {
    this.payment.receptorUser = receptorUser
    return this
  }

  setOwner (owner: string): PaymentBuilder {
    this.payment.owner = owner
    return this
  }

  setType (type: PaymentType): PaymentBuilder {
    this.payment.type = type
    return this
  }

  build (): PaymentModel {
    return this.payment
  }
}

enum PaymentType {
  PAYMENT = 1,
  TRANSFER,
}
