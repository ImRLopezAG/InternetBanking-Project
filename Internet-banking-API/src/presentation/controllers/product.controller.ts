import { NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { GenericController, ProductService } from '../../apps'
import { Generate, Product, ProductModel } from '../../domain'
import { IProductController } from '../../interfaces'
import { AccountType } from '../../utils'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class ProductController extends GenericController<Product, ProductService> implements IProductController {
  protected service: ProductService
  constructor (service: ProductService) {
    super(service)
    this.service = service
    this.AddBalance = this.AddBalance.bind(this)
    this.GetByPin = this.GetByPin.bind(this)
    this.GetByOwner = this.GetByOwner.bind(this)
    this.GetPrincipal = this.GetPrincipal.bind(this)
  }

  async AddBalance (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { pin, balance } = req.body
      const product = await this.service.AddBalance(pin, balance)
      console.log(product)
      return res.status(200).json(product)
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }

  async GetByPin (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { pin } = req.params
      const product = await this.service.GetByPin(pin)
      return res.status(200).json(product)
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }

  async GetByOwner (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { owner } = req.params
      const products = await this.service.GetByOwner(owner)
      return res.status(200).json(products)
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }

  async GetPrincipal (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { owner } = req.params
      const products = await this.service.GetByOwner(owner)
      const principal = products.find((product) => product.principal)
      return res.status(200).json(principal)
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }

  override async Create (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { limit, type, user, balance } = req.body
      if (!user || !type) {
        return res.status(400).send(`${user ? 'User' : 'Type'} is required`)
      }

      if (type === AccountType.CREDIT && !limit) {
        console.log('here limit')
        return res.status(400).send('Limit is required for credit accounts')
      }

      if (limit && type !== AccountType.CREDIT) {
        console.log('here limit 2')
        return res.status(400).send('Limit is only for credit accounts')
      }
      const { cardNumber, pin, cvv, expirationDate, cardHolder } = Generate.card()

      const entity = new ProductModel()
        .withUser(user)
        .withType(type)
        .withCardNumber(cardNumber)
        .withPin(pin)
        .withCvv(cvv)
        .withExpirationDate(expirationDate)
        .withCardHolder(cardHolder)
        .isActive(true)
        .isPrincipal(false)
        .withBalance(type !== AccountType.CREDIT ? balance : limit)
        .withLimit(type === AccountType.CREDIT ? limit : 0)

      console.log(entity)
      req.body = entity

      return await super.Create(req, res, next)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }
}
