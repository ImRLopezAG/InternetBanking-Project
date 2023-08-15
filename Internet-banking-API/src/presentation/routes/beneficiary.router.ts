import { Router } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { BeneficiaryController } from '../controllers'
import { adminValidation, senderValidation } from '../middleware'

export const beneficiary = Router()

const controller: BeneficiaryController = container.resolve(
  BeneficiaryController
)

beneficiary.get('/list', adminValidation, controller.GetAll)
beneficiary.get('/list/:sender', senderValidation, controller.GetBySender)
beneficiary.get('/get/:id', controller.Get)
beneficiary.post('/create', controller.Create)
beneficiary.delete('/delete', controller.DeleteWithBody)
beneficiary.delete('/delete/:id', adminValidation, controller.Delete)
