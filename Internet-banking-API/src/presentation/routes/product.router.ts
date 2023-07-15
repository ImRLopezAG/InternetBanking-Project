import { Router } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { ProductController } from '../controllers'
import { adminValidation, userValidation } from '../middleware'

export const product = Router()

const controller: ProductController = container.resolve(ProductController)

product.get('/list', adminValidation, controller.GetAll)
product.get('/list/:owner', userValidation, controller.GetByOwner)
product.get('/get/:pin', controller.GetByPin)
product.get('/get/:id', controller.Get)
product.post('/create', adminValidation, controller.Create)
product.post('/add-balance', adminValidation, controller.AddBalance)
product.put('/update/:id', adminValidation, controller.Update)
product.delete('/delete/:id', adminValidation, controller.Delete)
