import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { BeneficiaryService, GenericController } from '../../apps'
import { Beneficiary } from '../../domain'
import { IBeneficiaryController } from '../../interfaces'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class BeneficiaryController extends GenericController<Beneficiary, BeneficiaryService> implements IBeneficiaryController {
  protected service: BeneficiaryService
  constructor (service: BeneficiaryService) {
    super(service)
    this.service = service
  }

  async GetBySender (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const { sender } = req.params
      const beneficiaries = await this.service.GetBySender(sender)
      return res.status(200).json(beneficiaries)
    } catch (error) {
      if (error instanceof Error) {
        return next(error)
      }
    }
  }
}
