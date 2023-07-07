import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
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

      if (!entity.userId) return res.status(400).json({ message: 'The userId is required' })

      const card = Generate.cardNumber()
      const pin = Generate.pin()
      const cvv = Generate.cvv()
      const expirationDate = Generate.expirationDate()
      const cardHolder = Generate.cardHolder(card)

      entity.cardNumber = card
      entity.pin = pin
      entity.cvv = cvv
      entity.expirationDate = expirationDate
      entity.cardHolder = cardHolder

      const newEntity = await this.service.Create(entity)

      return res.status(201).json(newEntity)
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }
}
