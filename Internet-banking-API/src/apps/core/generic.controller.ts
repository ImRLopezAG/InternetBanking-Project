import { NextFunction, Request, Response } from 'express'
import { BaseEntity } from '../../domain/models/base.entity'
import { IGenericController } from '../../utils/constants'
import { GenericService } from './generic.service'

export class GenericController< TEntity extends BaseEntity, TService extends GenericService<TEntity>> implements IGenericController {
  protected service: TService

  constructor (service: TService) {
    this.service = service
    this.GetAll = this.GetAll.bind(this)
    this.Get = this.Get.bind(this)
    this.Create = this.Create.bind(this)
    this.Update = this.Update.bind(this)
    this.Delete = this.Delete.bind(this)
  }

  async GetAll (_req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const entities = await this.service.GetAll()

      return res.status(200).json(entities)
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
      return res.status(500).send('Internal server error')
    }
  }

  async Get (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'The id is required' })
      }

      const entity = await this.service.Get(id)

      if (entity != null) {
        return res.status(200).json(entity)
      } else {
        return res.status(404).json({
          message: `The entity with id ${req.params.id} does not exist`
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
    }
  }

  async Create (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const schema = this.service.GetSchema()

      for (const field of schema) {
        if (field.allowNull === false && req.body[field.field] === undefined) {
          return res
            .status(400)
            .json({ message: `The field ${field.field} is required` })
        }
      }

      const entity = req.body as TEntity
      const created = await this.service.Create(entity)

      return res.status(201).json({ created })
    } catch (error: any) {
      if (error.name === 'MongoServerError' || error.message.startsWith('BR:')) {
        return res.status(400).json({ message: error.message })
      }
      return next(error)
    }
  }

  async Update (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'The id is required' })
      }

      const entity = await this.service.Get(id)

      if (entity != null) {
        const data = req.body as TEntity
        const updated = await this.service.Update(id, data)
        return res.status(200).json({ updated })
      } else {
        return res
          .status(404)
          .json({ message: `The entity with id ${id} does not exist` })
      }
    } catch (error: any) {
      if (error.name === 'MongoServerError' || error.message.startsWith('BR:')) {
        return res.status(400).json({ message: error.message })
      }
      return next(error)
    }
  }

  async Delete (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'The id is required' })
      }

      await this.service.Delete(id)

      return res.status(204).json()
    } catch (error: any) {
      if (error.name === 'MongoServerError') {
        return res.status(400).json({ message: error.message })
      }
      return next(error)
    }
  }
}
