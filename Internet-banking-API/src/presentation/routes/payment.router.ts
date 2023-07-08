import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { PaymentController } from '../controllers'

export const payment = Router()

const controller: PaymentController = container.resolve(PaymentController)

payment.get('/list', controller.GetAll)
payment.get('/get/:id', controller.Get)
payment.post('/create', controller.Create)
payment.delete('/delete/:id', controller.Delete)
