import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { BeneficiaryController } from '../controllers'

export const beneficiary = Router()

const controller: BeneficiaryController = container.resolve(BeneficiaryController)

beneficiary.get('/list', controller.GetAll)
beneficiary.get('/get/:id', controller.Get)
beneficiary.post('/create', controller.Create)
beneficiary.delete('/delete/:id', controller.Delete)
