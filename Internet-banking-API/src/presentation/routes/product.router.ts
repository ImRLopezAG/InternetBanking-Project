import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ProductController } from '../controllers'
import { adminValidation } from '../middleware'

export const product = Router()

const controller: ProductController = container.resolve(ProductController)

product.get('/list', adminValidation, controller.GetAll)
product.get('/list/:owner', controller.GetByOwner)
product.get('/get/:id', controller.Get)
product.get('/pin/:pin', controller.GetByPin)
product.get('/principal/:owner', controller.GetPrincipal)
product.post('/create', adminValidation, controller.Create)
product.post('/add-balance', adminValidation, controller.AddBalance)
product.put('/update/:id', adminValidation, controller.Update)
product.delete('/delete/:id', adminValidation, controller.Delete)
