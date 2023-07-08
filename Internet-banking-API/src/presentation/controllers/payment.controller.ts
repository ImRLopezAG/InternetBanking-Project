import 'reflect-metadata'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { GenericController, PaymentService } from '../../app/'
import { Payment } from '../../domain'
import { IPaymentController } from '../../interfaces'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class PaymentController extends GenericController<Payment, PaymentService> implements IPaymentController {
  protected service: PaymentService
  constructor (service: PaymentService) {
    super(service)
    this.service = service
  }
}
