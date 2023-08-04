import { Response, Request, NextFunction } from 'express'
import { IGenericController } from '../../utils/constants'

export interface IProductController extends IGenericController {
  GetByPin: (req: Request, res: Response, next: NextFunction) => Promise<Response>
  AddBalance: (req: Request, res: Response, next: NextFunction) => Promise<Response>
  GetByOwner: (req: Request, res: Response, next: NextFunction) => Promise<Response>
  GetPrincipal: (req: Request, res: Response, next: NextFunction) => Promise<Response>
}
