import { Router } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { PaymentController } from '../controllers'
import { adminValidation, senderValidation } from '../middleware'

export const payment = Router()

const controller: PaymentController = container.resolve(PaymentController)

payment.get('/list', adminValidation, controller.GetAll)
payment.get('/list/:sender', senderValidation, controller.GetBySender)
payment.get('/get/:id', adminValidation, controller.Get)
payment.post('/create', senderValidation, controller.Create)
payment.post('/loan', senderValidation, controller.LoanPayment)
payment.post('/credit', senderValidation, controller.CreditPayment)
