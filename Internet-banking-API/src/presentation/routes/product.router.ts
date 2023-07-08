import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ProductController } from '../controllers'
import { isAdmin } from '../middleware'

export const product = Router()

const controller: ProductController = container.resolve(ProductController)

product.get('/list', controller.GetAll)
product.get('/get/:pin', controller.GetByPin)
product.get('/get/:id', controller.Get)
product.post('/create', isAdmin, controller.Create)
product.post('/add-balance', isAdmin, controller.AddBalance)
product.put('/update/:id', isAdmin, controller.Update)
product.delete('/delete/:id', isAdmin, controller.Delete)
