import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { GenericController, UserService } from '../../apps'
import { Generate, ProductModel, User } from '../../domain'
import { IUserController } from '../../interfaces'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class UserController extends GenericController<User, UserService> implements IUserController {
  protected service: UserService
  constructor (service: UserService) {
    super(service)
    this.service = service
    this.GetByEmail = this.GetByEmail.bind(this)
    this.GetByUsername = this.GetByUsername.bind(this)
  }

  async GetByEmail (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const email = req.params.email
      email ?? res.status(400).json({ message: 'The email is required' })

      const user = await this.service.GetByEmail(email)

      if (user != null) {
        return res.status(200).json(user)
      } else {
        return res
          .status(404)
          .json({ message: `The user with email ${email} does not exist` })
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
      return res
        .status(500)
        .json({ status: 500, message: 'Internal server error' })
    }
  }

  async GetByUsername (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const username = req.params.username
      username ?? res.status(400).json({ message: 'The username is required' })

      const user = await this.service.GetByUserName(username)

      if (user != null) {
        return res.status(200).json(user)
      } else {
        return res
          .status(404)
          .json({
            message: `The user with username ${username} does not exist`
          })
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
      return res
        .status(500)
        .json({ status: 500, message: 'Internal server error' })
    }
  }

  override async Create (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const schema = this.service.GetSchema()

      schema.forEach((ent) => {
        if (ent.allowNull === false && req.body[ent.field] === undefined) {
          return res
            .status(400)
            .json({ message: `The field ${ent.field} is required` })
        }
      })

      const user = await this.service.Create(req.body)
      if (user.role !== 1) {
        const { balance } = req.body
        const { pin, cvv, expirationDate, cardNumber, cardHolder } = Generate.card()

        const product = new ProductModel({
          pin,
          cvv,
          expirationDate,
          cardNumber,
          cardHolder,
          user: user._id,
          balance,
          principal: true
        })

        await product.save()
        return res.status(201).json({ user, product })
      }
      return res.status(201).json(user)
    } catch (error) {
      return next(error)
    }
  }
}
