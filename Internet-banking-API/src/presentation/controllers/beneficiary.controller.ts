import 'reflect-metadata'
import { Lifecycle, injectable, scoped } from 'tsyringe'
import { GenericController, BeneficiaryService } from '../../app/'
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
}
