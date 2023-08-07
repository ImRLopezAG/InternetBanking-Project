import { Payment } from '../../domain/models'
import { IGenericService } from '../../utils/constants'

export interface IPaymentService extends IGenericService<Payment> {
  GetBySender: (sender: string) => Promise<Payment[]>
  LoanPayment: (entity: Payment) => Promise<Payment>
  CreditPayment: (entity: Payment) => Promise<Payment>
  GetTransactions: (sender: string) => Promise<Payment[]>
  GetPayments: (sender: string) => Promise<Payment[]>
}
