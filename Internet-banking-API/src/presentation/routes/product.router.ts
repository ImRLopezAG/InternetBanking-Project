import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ProductController } from '../controllers'

export const product = Router()

const controller: ProductController = container.resolve(ProductController)

product.get('/list', controller.GetAll)
product.get('/get/:id', controller.Get)
product.post('/create', controller.Create)
product.delete('/delete/:id', controller.Delete)
