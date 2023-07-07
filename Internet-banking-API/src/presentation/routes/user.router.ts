import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { jwtValidation } from '../../shared/libs'
import { UserController } from '../controllers'
import { validateUpdateUser, validateUser } from '../middleware'

export const user = Router()

const controller: UserController = container.resolve(UserController)

user.get('/list', controller.GetAll)
user.get('/Get/:id', controller.Get)
user.get('/email/:email', controller.GetByEmail)
user.get('/username/:username', controller.GetByUsername)
user.post('/create', validateUser, controller.Create)
user.put('/update/:id', jwtValidation, validateUpdateUser, controller.Update)
user.delete('/delete/:id', controller.Delete)
