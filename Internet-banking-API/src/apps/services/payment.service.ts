import { Payment, PaymentModel, ProductModel } from '../../domain'
import { IPaymentService } from '../../interfaces'
import { GenericService } from '../core'
export class PaymentService extends GenericService<Payment> implements IPaymentService {
  constructor () {
    super(PaymentModel)
  }

  override async Create (entity: Payment): Promise<Payment> {
    const { sender, receptor, amount } = entity
    const senderProduct = await ProductModel.findOne({ pin: sender })
    const receptorProduct = await ProductModel.findOne({ pin: receptor })
    if (!senderProduct || !receptorProduct) {
      throw Error('BR: Product not found')
    }
    if (senderProduct.balance < amount) {
      throw new Error('BR: Insufficient funds')
    }
    senderProduct.balance -= amount
    receptorProduct.balance += amount

    await ProductModel.findByIdAndUpdate(senderProduct._id, senderProduct)
    await ProductModel.findByIdAndUpdate(receptorProduct._id, receptorProduct)
    return await super.Create(entity)
  }

  async GetBySender (sender: string): Promise<Payment[]> {
    return await PaymentModel.find({ sender }).exec()
  }
}
