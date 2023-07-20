import { Router } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { PaymentController } from '../controllers'
import { adminValidation, userValidation } from '../middleware'

export const payment = Router()

const controller: PaymentController = container.resolve(PaymentController)

payment.get('/list', adminValidation, controller.GetAll)
payment.get('/list/:sender', userValidation, controller.GetBySender)
payment.get('/get/:id', adminValidation, controller.Get)
payment.post('/create', controller.Create)
payment.post('/loan', controller.LoanPayment)
payment.post('/credit', controller.CreditPayment)
payment.delete('/delete/:id', controller.Delete)
