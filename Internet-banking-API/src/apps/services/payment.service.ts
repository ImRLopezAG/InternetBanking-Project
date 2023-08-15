import { Payment, PaymentModel, ProductModel } from '../../domain'
import { IPaymentService } from '../../interfaces'
import { AccountType, TransactionType } from '../../utils'
import { GenericService } from '../core'
export class PaymentService extends GenericService<Payment> implements IPaymentService {
  constructor () {
    super(PaymentModel)
  }

  override async Create (entity: Payment): Promise<Payment> {
    const { sender, receptor, amount, owner, receptorUser } = entity
    const senderProduct = await ProductModel.findOne({ pin: sender })
    const receptorProduct = await ProductModel.findOne({ pin: receptor })
    const taxes = amount + (amount * 0.08)

    if (!senderProduct || !receptorProduct) {
      throw Error('BR: Product not found')
    }
    if (senderProduct.balance < taxes) {
      throw new Error('BR: Insufficient funds')
    }

    senderProduct
      .setBalance(senderProduct.balance - taxes)
    receptorProduct
      .setBalance(receptorProduct.balance + amount)

    await ProductModel.findByIdAndUpdate(senderProduct._id, senderProduct)
    await ProductModel.findByIdAndUpdate(receptorProduct._id, receptorProduct)
    return await super.Create(entity)
  }

  async GetBySender (owner: string): Promise<Payment[]> {
    return await PaymentModel.find({ owner }).exec()
  }

  async GetTransactions (owner: string): Promise<Payment[]> {
    return await PaymentModel.find({ $or: [{ owner }, { receptorUser: owner }], $and: [{ type: TransactionType.TRANSFER }] }).sort({ createdAt: -1 }).exec()
  }

  async GetPayments (owner: string): Promise<Payment[]> {
    return await PaymentModel.find({ $or: [{ owner }, { receptorUser: owner }], $and: [{ type: TransactionType.PAYMENT }] }).sort({ createdAt: -1 }).exec()
  }

  async LoanPayment (entity: Payment): Promise<Payment> {
    const { sender, amount, receptor } = entity

    const product = await ProductModel.findOne({ pin: sender })
    const loan = await ProductModel.findOne({ pin: receptor })

    const taxes = amount + (amount * 0.08)

    if (product === null || loan === null) {
      throw new Error('BR: Product not found')
    }

    if (loan.type !== AccountType.LOAN) {
      throw new Error('BR: Invalid product')
    }

    if (product.balance < taxes) {
      throw new Error('BR: Insufficient funds')
    }

    if (product.type === AccountType.CREDIT && product.limit < loan.balance + (loan.balance * 0.18)) {
      throw new Error('BR: Insufficient funds')
    }

    if (loan.balance < amount) {
      product.balance -= loan.balance
      loan.balance = 0
      loan.active = false
    } else {
      product.balance -= taxes
      loan.balance -= amount
    }

    await ProductModel.findByIdAndUpdate(product._id, product)
    await ProductModel.findByIdAndUpdate(loan._id, loan)

    return await super.Create(entity)
  }

  async CreditPayment (entity: Payment): Promise<Payment> {
    const { sender, amount, receptor, owner, receptorUser } = entity

    const product = await ProductModel.findOne({ pin: sender })
    const credit = await ProductModel.findOne({ pin: receptor })

    const taxes = amount + (amount * 0.08)

    if (product === null || credit === null) {
      throw new Error('BR: Product not found')
    }

    if (product.type === AccountType.CREDIT || product.type === AccountType.LOAN) {
      throw new Error('BR: Invalid product')
    }

    if (product.balance < taxes) {
      throw new Error('BR: Insufficient funds')
    }

    if (credit.limit < amount) {
      product.balance -= credit.limit + (credit.limit * 0.18)
      credit.balance = credit.limit
    } else {
      product.balance -= taxes
      credit.balance += amount
    }

    await ProductModel.findByIdAndUpdate(product._id, product)
    await ProductModel.findByIdAndUpdate(credit._id, credit)
    return await super.Create(entity)
  }
}
