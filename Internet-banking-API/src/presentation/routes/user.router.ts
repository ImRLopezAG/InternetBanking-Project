import 'reflect-metadata'
import { Router } from 'express'
import { container } from 'tsyringe'
import { UserController } from '../controllers'

export const user = Router()

const controller: UserController = container.resolve(UserController)

user.get('/list', controller.GetAll)
user.get('/get/:id', controller.Get)
user.get('/get/:email', controller.GetByEmail)
user.get('/get/:username', controller.GetByUsername)
user.delete('/delete/:id', controller.Delete)
