import { Router } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { BeneficiaryController } from '../controllers'
import { adminValidation, userValidation } from '../middleware'

export const beneficiary = Router()

const controller: BeneficiaryController = container.resolve(
  BeneficiaryController
)

beneficiary.get('/list', adminValidation, controller.GetAll)
beneficiary.get('/list/:sender', userValidation, controller.GetBySender)
beneficiary.get('/get/:id', controller.Get)
beneficiary.post('/create', controller.Create)
beneficiary.delete('/delete/:id', adminValidation, controller.Delete)
