import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { UserController } from '../controllers'
import { adminValidation, ownerValidation } from '../middleware'

export const user = Router()

const controller: UserController = container.resolve(UserController)

user.get('/list', adminValidation, controller.GetAll)
user.get('/get/:id', ownerValidation, controller.Get)
user.get('/get/:email', controller.GetByEmail)
user.get('/get/:username', controller.GetByUsername)
user.delete('/delete/:id', adminValidation, controller.Delete)
