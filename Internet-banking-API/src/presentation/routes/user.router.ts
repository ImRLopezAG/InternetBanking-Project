import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { jwtValidation } from '../../shared/libs'
import { UserController } from '../controllers'
import { isAdmin, validateUpdateUser, validateUser } from '../middleware'

export const user = Router()

const controller: UserController = container.resolve(UserController)

user.get('/list', isAdmin, controller.GetAll)
user.get('/get/:id', isAdmin, controller.Get)
user.get('/get/:email', isAdmin, controller.GetByEmail)
user.get('/get/:username', isAdmin, controller.GetByUsername)
user.post('/create', validateUser, isAdmin, controller.Create)
user.put('/update/:id', jwtValidation, validateUpdateUser, controller.Update)
user.delete('/delete/:id', isAdmin, controller.Delete)
