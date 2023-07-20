import { NextFunction, Request, Response } from 'express'
import { IGenericController } from '../../utils/constants'

export interface IPaymentController extends IGenericController {
  GetBySender: (req: Request, res: Response, next: NextFunction) => Promise<Response>
  LoanPayment: (req: Request, res: Response, next: NextFunction) => Promise<Response>
  CreditPayment: (req: Request, res: Response, next: NextFunction) => Promise<Response>
}
