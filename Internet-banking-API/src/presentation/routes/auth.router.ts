import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { authenticate } from '../auth/auth.controller'
import { UserController } from '../controllers'
import { ownerValidation, userValidation } from '../middleware'

export const auth = Router()
const controller: UserController = container.resolve(UserController)

auth.post('/sign-up', userValidation, controller.Create)
auth.put('/update/:id', ownerValidation, userValidation, controller.Update)
auth.post('/Login', authenticate)
