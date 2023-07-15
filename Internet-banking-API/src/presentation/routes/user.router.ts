import { Router } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { jwtValidation } from '../../shared/libs'
import { UserController } from '../controllers'
import { adminValidation, ownerValidation, userValidation } from '../middleware'

export const user = Router()

const controller: UserController = container.resolve(UserController)

user.get('/list', adminValidation, controller.GetAll)
user.get('/get/:id', adminValidation, controller.Get)
user.get('/get/:email', adminValidation, controller.GetByEmail)
user.get('/get/:username', adminValidation, controller.GetByUsername)
user.post('/create', userValidation, controller.Create)
user.put('/update/:id', jwtValidation, ownerValidation, controller.Update)
user.delete('/delete/:id', adminValidation, controller.Delete)
