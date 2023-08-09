import { BaseModel } from './base'

export class ProductModel extends BaseModel {
  declare pin: string
  declare cvv: string
  declare expirationDate: string
  declare cardNumber: string
  declare cardHolder: string
  declare balance: number
  declare principal: boolean
  declare limit: number
  declare active: boolean
  declare type: AccountType
  declare user: string

  constructor () {
    super()
    this.pin = ''
    this.cvv = ''
    this.expirationDate = ''
    this.cardNumber = ''
    this.cardHolder = ''
    this.balance = 0
    this.principal = false
    this.limit = 0
    this.active = true
    this.type = AccountType.Credit
    this.user = ''
  }
}

export class ProductBuilder {
  private readonly product: ProductModel

  constructor () {
    this.product = new ProductModel()
  }

  build (): ProductModel {
    return this.product
  }

  setId (id: string): ProductBuilder {
    this.product.setId(id)
    return this
  }

  setCreatedAt (createdAt: Date): ProductBuilder {
    this.product.setCreatedAt(createdAt)
    return this
  }

  setPin (pin: string): ProductBuilder {
    this.product.pin = pin
    return this
  }

  setCvv (cvv: string): ProductBuilder {
    this.product.cvv = cvv
    return this
  }

  setExpirationDate (expirationDate: string): ProductBuilder {
    this.product.expirationDate = expirationDate
    return this
  }

  setCardNumber (cardNumber: string): ProductBuilder {
    this.product.cardNumber = cardNumber
    return this
  }

  setCardHolder (cardHolder: string): ProductBuilder {
    this.product.cardHolder = cardHolder
    return this
  }

  setBalance (balance: number): ProductBuilder {
    this.product.balance = balance
    return this
  }

  setPrincipal (principal: boolean): ProductBuilder {
    this.product.principal = principal
    return this
  }

  setLimit (limit: number): ProductBuilder {
    this.product.limit = limit
    return this
  }

  setActive (active: boolean): ProductBuilder {
    this.product.active = active
    return this
  }

  setType (type: AccountType): ProductBuilder {
    this.product.type = type
    return this
  }

  setUser (user: string): ProductBuilder {
    this.product.user = user
    return this
  }
}

enum AccountType {
  Credit = 1,
  Debit,
  Loan
}
