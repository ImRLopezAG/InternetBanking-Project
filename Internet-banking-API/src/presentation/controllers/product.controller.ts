import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { GenericController, ProductService } from '../../apps'
import { Generate, Product } from '../../domain'
import { IProductController } from '../../interfaces'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class ProductController extends GenericController<Product, ProductService> implements IProductController {
  protected service: ProductService
  constructor (service: ProductService) {
    super(service)
    this.service = service
    this.AddBalance = this.AddBalance.bind(this)
    this.GetByPin = this.GetByPin.bind(this)
  }

  override async Create (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const entity: Product = req.body
      const { cardNumber, pin, cvv, expirationDate, cardHolder } = Generate.card()

      entity.cardNumber = cardNumber
      entity.pin = pin
      entity.cvv = cvv
      entity.expirationDate = expirationDate
      entity.cardHolder = cardHolder

      return await super.Create(req, res, next)
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
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
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }
}
