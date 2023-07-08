import { NextFunction, Request, Response } from 'express'
import { IGenericController } from '../../utils/constants'

export interface IBeneficiaryController extends IGenericController {
  GetBySender: (req: Request, res: Response, next: NextFunction) => Promise<Response>
}
