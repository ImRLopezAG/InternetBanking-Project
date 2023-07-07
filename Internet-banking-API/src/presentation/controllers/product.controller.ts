import { NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { GenericController, ProductService } from '../../app/'
import { Generate, Product } from '../../domain'
import { IProductController } from '../../interfaces/controllers'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class ProductController extends GenericController<Product, ProductService> implements IProductController {
  protected service: ProductService
  constructor (service: ProductService) {
    super(service)
    this.service = service
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
}
