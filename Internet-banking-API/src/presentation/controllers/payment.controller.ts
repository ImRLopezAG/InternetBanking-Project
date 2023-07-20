import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { GenericController, PaymentService } from '../../apps'
import { Payment } from '../../domain'
import { IPaymentController } from '../../interfaces'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class PaymentController extends GenericController<Payment, PaymentService> implements IPaymentController {
  protected service: PaymentService
  constructor (service: PaymentService) {
    super(service)
    this.service = service
    this.GetBySender = this.GetBySender.bind(this)
    this.LoanPayment = this.LoanPayment.bind(this)
    this.CreditPayment = this.CreditPayment.bind(this)
  }

  async GetBySender (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { sender } = req.params
      const payments = await this.service.GetBySender(sender)
      return res.status(200).json(payments)
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
    }
  }

  async LoanPayment (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const payment = await this.service.LoanPayment(req.body)
      return res.status(200).json(payment)
    } catch (error: any) {
      if (error.name === 'MongoServerError' || error.message.startsWith('BR:')) {
        return res.status(400).json({ message: error.message })
      }
      return next(error)
    }
  }

  async CreditPayment (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const payment = await this.service.CreditPayment(req.body)
      return res.status(200).json(payment)
    } catch (error: any) {
      if (error.name === 'MongoServerError' || error.message.startsWith('BR:')) {
        return res.status(400).json({ message: error.message })
      }
      return next(error)
    }
  }
}
