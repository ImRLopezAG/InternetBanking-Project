import { Payment, PaymentModel } from '../../domain'
import { IPaymentService } from '../../interfaces'
import { GenericService } from '../core'
export class PaymentService extends GenericService<Payment> implements IPaymentService {
  constructor () {
    super(PaymentModel)
  }
}
